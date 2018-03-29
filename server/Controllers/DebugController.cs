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
using PodNoms.Api.Services.Push;
using PodNoms.Api.Services.Realtime;
using WebPush = Lib.Net.Http.WebPush;

namespace PodNoms.Api.Controllers {
    [Route("[controller]")]
    public class DebugController : AuthController {
        private readonly StorageSettings _storageSettings;
        private readonly AudioFileStorageSettings _audioFileStorageSettings;
        private readonly ApplicationsSettings _applicationsSettings;
        private readonly ImageFileStorageSettings _imageFileStorageSettings;
        private readonly HubLifetimeManager<DebugHub> _hubManager;
        private readonly IPushSubscriptionStore _subscriptionStore;
        private readonly IPushNotificationService _notificationService;

        public AppSettings _appSettings { get; }

        public DebugController(IOptions<StorageSettings> settings, IOptions<AppSettings> appSettings,
            HubLifetimeManager<DebugHub> hubManager, IUserRepository userRepository,
            IOptions<ApplicationsSettings> applicationsSettings,
            IOptions<AudioFileStorageSettings> audioFileStorageSettings,
            IOptions<ImageFileStorageSettings> imageFileStorageSettings,
            IPushSubscriptionStore subscriptionStore,
            IPushNotificationService notificationService) : base(userRepository) {
            this._appSettings = appSettings.Value;
            this._storageSettings = settings.Value;
            this._applicationsSettings = applicationsSettings.Value;
            this._audioFileStorageSettings = audioFileStorageSettings.Value;
            this._imageFileStorageSettings = imageFileStorageSettings.Value;
            this._hubManager = hubManager;
            this._subscriptionStore = subscriptionStore;
            this._notificationService = notificationService;
        }

        [Authorize]
        [HttpGet]
        public IActionResult Get() {
            var config = new {
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

        [Authorize]
        [HttpPost("realtime")]
        public async Task<IActionResult> Realtime([FromBody] string message) {
            await _hubManager.SendUserAsync(User.Identity.Name, "Send", new string[] { $"User {User.Identity.Name}: {message}" });
            await _hubManager.SendAllAsync("Send", new string[] { $"All: {message}" });
            return Ok(message);
        }
        [Authorize]
        [HttpGet("serverpush")]
        public async Task<string> ServerPush() {
            WebPush.PushMessage pushMessage = new WebPush.PushMessage("Argle Bargle, Foo Ferra") {
                Topic = "Debug",
                Urgency = WebPush.PushMessageUrgency.Normal
            };
            var uid = await GetUserUidAsync();

            await _subscriptionStore.ForEachSubscriptionAsync(uid, (subscription) => {
                _notificationService.SendNotificationAsync(subscription, pushMessage);
            });

            return "Hello Sailor!";
        }
    }
}