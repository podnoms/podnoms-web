using System;
using AutoMapper;
using Hangfire;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using PodNoms.Api.Models;
using PodNoms.Api.Models.ViewModels;
using PodNoms.Api.Persistence;
using PodNoms.Api.Services.Processor;
using PodNoms.Api.Services.Storage;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace PodNoms.Api.Controllers {
    [Route ("[controller]")]
    public class EntryController : Controller {
        private readonly IPodcastRepository _podcastRepository;
        private readonly IEntryRepository _repository;
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;
        private readonly IUrlProcessService _processor;
        private readonly ILogger _logger;
        private readonly AudioFileStorageSettings _audioFileStorageSettings;
        private readonly StorageSettings _storageSettings;

        public EntryController (IEntryRepository repository,
            IPodcastRepository podcastRepository,
            IUnitOfWork unitOfWork, IMapper mapper, IOptions<StorageSettings> storageSettings,
            IOptions<AudioFileStorageSettings> audioFileStorageSettings,
            IUrlProcessService processor, ILoggerFactory logger) {
            this._logger = logger.CreateLogger<EntryController> ();
            this._podcastRepository = podcastRepository;
            this._repository = repository;
            this._storageSettings = storageSettings.Value;
            this._uow = unitOfWork;
            this._audioFileStorageSettings = audioFileStorageSettings.Value;
            this._mapper = mapper;
            this._processor = processor;
        }

        private void _processEntry (PodcastEntry entry) {
            try {
                var infoJobId = BackgroundJob.Enqueue<IUrlProcessService> (
                    service => service.GetInformation (entry.Id));
                var extract = BackgroundJob.ContinueWith<IUrlProcessService> (
                    infoJobId, service => service.DownloadAudio (entry.Id));
                var upload = BackgroundJob.ContinueWith<IAudioUploadProcessService> (
                    extract, service => service.UploadAudio (entry.Id, entry.AudioUrl));
            } catch (InvalidOperationException ex) {
                _logger.LogError ($"Failed submitting job to processor\n{ex.Message}");
                entry.ProcessingStatus = ProcessingStatus.Failed;
            }
        }

        [HttpGet ("all/{podcastSlug}")]
        public async Task<IActionResult> GetAllForSlug (string podcastSlug) {
            var entries = await _repository.GetAllAsync (podcastSlug);
            var results = _mapper.Map<List<PodcastEntry>, List<PodcastEntryViewModel>> (entries.ToList ());

            return Ok (results);
        }

        [HttpPost]
        public async Task<IActionResult> Post ([FromBody] PodcastEntryViewModel item) {

            // first check url is valid

            var entry = _mapper.Map<PodcastEntryViewModel, PodcastEntry> (item);
            if (entry.ProcessingStatus == ProcessingStatus.Accepted) {
                var podcast = await _podcastRepository.GetAsync (item.PodcastId);
                entry.ImageUrl = $"{_storageSettings.CdnUrl}static/images/default-entry.png";

                entry.Podcast = podcast;
                entry.Processed = false;
                entry.Title = "Waiting for information";
            }
            await _repository.AddOrUpdateAsync (entry);
            await _uow.CompleteAsync ();

            if (entry.ProcessingStatus.Equals (ProcessingStatus.Accepted) && entry.Id != 0) {
                _processEntry (entry);
            }
            var result = _mapper.Map<PodcastEntry, PodcastEntryViewModel> (entry);
            return Ok (result);

        }

        [HttpDelete ("{id}")]
        public async Task<IActionResult> Delete (int id) {
            await this._repository.DeleteAsync (id);
            await _uow.CompleteAsync ();
            return Ok ();
        }

        [HttpPost ("isvalid")]
        public async Task<IActionResult> IsValid ([FromBody] string url) {
            if (!string.IsNullOrEmpty (url)) {
                var isValid = await _processor.CheckUrlValid (url);
                if (isValid) return Ok ();
            }
            return BadRequest ();
        }
    }
}