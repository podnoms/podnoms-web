using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Hangfire;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using PodNoms.Api.Models;
using PodNoms.Api.Persistence;
using PodNoms.Api.Services.Downloader;
using PodNoms.Api.Services.Hubs;
using PodNoms.Api.Services.Jobs;
using PodNoms.Api.Services.Realtime;

namespace PodNoms.Api.Controllers
{
    [Route("[controller]")]
    public class DebugController : Controller
    {
        private readonly StorageSettings _storageSettings;
        private readonly AudioFileStorageSettings _audioFileStorageSettings;
        private readonly ApplicationsSettings _applicationsSettings;
        private readonly ImageFileStorageSettings _imageFileStorageSettings;
        private readonly HubLifetimeManager<DebugHub> _hubManager;
        private readonly IUserRepository _userRepository;

        public AppSettings _appSettings { get; }

        public DebugController(IOptions<StorageSettings> settings, IOptions<AppSettings> appSettings,
                               HubLifetimeManager<DebugHub> hubManager, IUserRepository userRepository,
                               IOptions<ApplicationsSettings> applicationsSettings,
                               IOptions<AudioFileStorageSettings> audioFileStorageSettings,
                               IOptions<ImageFileStorageSettings> imageFileStorageSettings)
        {
            this._appSettings = appSettings.Value;
            this._storageSettings = settings.Value;
            this._applicationsSettings = applicationsSettings.Value;
            this._audioFileStorageSettings = audioFileStorageSettings.Value;
            this._imageFileStorageSettings = imageFileStorageSettings.Value;
            this._hubManager = hubManager;
            this._userRepository = userRepository;
        }

        [Authorize]
        public IActionResult Get()
        {
            var config = new
            {
                Version = _appSettings.Version,
                CdnUrl = _storageSettings.CdnUrl,
                AudioContainer = _audioFileStorageSettings.ContainerName,
                ImageContainer = _imageFileStorageSettings.ContainerName,
                YouTubeDlPath = _applicationsSettings.Downloader,
                YouTubeDlVersion = AudioDownloader.GetVersion(_applicationsSettings.Downloader),
                RssUrl = _appSettings.RssUrl
            };
            return new OkObjectResult(config);
        }

        [HttpGet("clear")]
        public IActionResult Clear()
        {
            return Ok();
        }

        [Authorize]
        [HttpPost("realtime")]
        public async Task<IActionResult> Realtime([FromBody] string message)
        {
            await _hubManager.InvokeUserAsync(User.Identity.Name, "Send", new string[] { $"User {User.Identity.Name}: {message}" });
            await _hubManager.InvokeAllAsync("Send", new string[] { $"All: {message}" });
            return Ok(message);
        }
    }
}