using System;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Hangfire;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.Net.Http.Headers;
using PodNoms.Api.Models;
using PodNoms.Api.Models.Settings;
using PodNoms.Api.Models.ViewModels;
using PodNoms.Api.Persistence;
using PodNoms.Api.Providers;
using PodNoms.Api.Services.Auth;
using PodNoms.Api.Services.Processor;
using PodNoms.Api.Services.Storage;
using PodNoms.Api.Utils;

namespace PodNoms.Api.Controllers {
    [Authorize]
    [Route("/podcast/{slug}/audioupload")]
    public class AudioUploadController : BaseAuthController {
        private readonly IPodcastRepository _podcastRepository;
        private readonly IEntryRepository _entryRepository;
        private IUnitOfWork _unitOfWork;
        private readonly ILogger<ImageUploadController> _logger;
        private readonly StorageSettings _storageSettings;
        private readonly AudioFileStorageSettings _audioFileStorageSettings;
        public IMapper _mapper { get; }

        public AudioUploadController(IPodcastRepository podcastRepository, IEntryRepository entryRepository, IUnitOfWork unitOfWork,
                        IOptions<AudioFileStorageSettings> settings, IOptions<StorageSettings> storageSettings,
                        ILoggerFactory loggerFactory, IMapper mapper,
                        UserManager<ApplicationUser> userManager, IHttpContextAccessor contextAccessor) : base(contextAccessor, userManager) {
            this._mapper = mapper;
            this._audioFileStorageSettings = settings.Value;
            this._storageSettings = storageSettings.Value;
            this._podcastRepository = podcastRepository;
            this._entryRepository = entryRepository;
            this._unitOfWork = unitOfWork;
            this._logger = loggerFactory.CreateLogger<ImageUploadController>();
        }

        [HttpPost]
        public async Task<IActionResult> Upload(string slug, IFormFile file) {
            _logger.LogDebug($"Settings are\nMaxUploadFileSize: {_audioFileStorageSettings.MaxUploadFileSize}");
            if (file == null || file.Length == 0) return BadRequest("No file found in stream");
            if (file.Length > _audioFileStorageSettings.MaxUploadFileSize) return BadRequest("Maximum file size exceeded");
            if (!_audioFileStorageSettings.IsSupported(file.FileName)) return BadRequest("Invalid file type");

            var podcast = await _podcastRepository.GetAsync(_userId, slug);
            if (podcast == null)
                return NotFound();

            var entry = new PodcastEntry {
                Title = Path.GetFileName(Path.GetFileNameWithoutExtension(file.FileName)),
                ImageUrl = $"{_storageSettings.CdnUrl}static/images/default-entry.png",
                Processed = false,
                ProcessingStatus = ProcessingStatus.Uploading,
                Podcast = podcast
            };

            var localFile = await CachedFormFileStorage.CacheItem(file);
            await _entryRepository.AddOrUpdateAsync(entry);
            await _unitOfWork.CompleteAsync();

            BackgroundJob.Enqueue<IAudioUploadProcessService>(service => service.UploadAudio(entry.Id, localFile));
            return new OkObjectResult(_mapper.Map<PodcastEntry, PodcastEntryViewModel>(entry));
        }
    }
}