using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Hangfire;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using PodNoms.Api.Models;
using PodNoms.Api.Models.ViewModels;
using PodNoms.Api.Persistence;
using PodNoms.Api.Services;
using PodNoms.Api.Services.Processor;
using PodNoms.Api.Services.Storage;

namespace PodNoms.Api.Controllers {
    [Route("[controller]")]
    public class EntryController : Controller {
        private readonly IPodcastRepository _podcastRepository;
        private readonly IEntryRepository _repository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IUrlProcessService _processor;
        private readonly ILogger _logger;
        private readonly AudioFileStorageSettings _audioFileStorageSettings;
        private readonly StorageSettings _storageSettings;

        public EntryController(IEntryRepository repository,
            IPodcastRepository podcastRepository,
            IUnitOfWork unitOfWork, IMapper mapper, IOptions<StorageSettings> storageSettings,
            IOptions<AudioFileStorageSettings> audioFileStorageSettings,
            IUrlProcessService processor, ILoggerFactory logger) {
            this._logger = logger.CreateLogger<EntryController>();
            this._podcastRepository = podcastRepository;
            this._repository = repository;
            this._storageSettings = storageSettings.Value;
            this._unitOfWork = unitOfWork;
            this._audioFileStorageSettings = audioFileStorageSettings.Value;
            this._mapper = mapper;
            this._processor = processor;
        }

        private void _processEntry(PodcastEntry entry) {
            try {
                var extractJobId = BackgroundJob.Enqueue<IUrlProcessService>(
                    service => service.DownloadAudio(entry.Id));
                var upload = BackgroundJob.ContinueWith<IAudioUploadProcessService>(
                    extractJobId, service => service.UploadAudio(entry.Id, entry.AudioUrl));
            } catch (InvalidOperationException ex) {
                _logger.LogError($"Failed submitting job to processor\n{ex.Message}");
                entry.ProcessingStatus = ProcessingStatus.Failed;
            }
        }

        [HttpGet("all/{podcastSlug}")]
        public async Task<IActionResult> GetAllForSlug(string podcastSlug) {
            var entries = await _repository.GetAllAsync(podcastSlug);
            var results = _mapper.Map<List<PodcastEntry>, List<PodcastEntryViewModel>>(entries.ToList());

            return Ok(results);
        }

        [HttpPost]
        public async Task<ActionResult<PodcastEntryViewModel>> Post([FromBody] PodcastEntryViewModel item) {

            // first check url is valid
            var entry = _mapper.Map<PodcastEntryViewModel, PodcastEntry>(item);
            var podcast = await _podcastRepository.GetAsync(item.PodcastId);
            if (podcast != null) {
                var status = await _processor.GetInformation(entry);
                if (status == AudioType.Valid) {
                    if (entry.ProcessingStatus == ProcessingStatus.Processing) {
                        if (string.IsNullOrEmpty(entry.ImageUrl)) {
                            entry.ImageUrl = $"{_storageSettings.CdnUrl}static/images/default-entry.png";
                        }
                        entry.Podcast = podcast;
                        entry.Processed = false;
                        await _repository.AddOrUpdateAsync(entry);
                        await _unitOfWork.CompleteAsync();
                        _processEntry(entry);
                        var result = _mapper.Map<PodcastEntry, PodcastEntryViewModel>(entry);
                        return result;
                    }
                } else if (status == AudioType.Playlist) {
                    entry.ProcessingStatus = ProcessingStatus.Deferred;
                    return Accepted(entry);
                }
            }
            return BadRequest();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id) {
            await this._repository.DeleteAsync(id);
            await _unitOfWork.CompleteAsync();
            return Ok();
        }
        [HttpPost("/preprocess")]
        public async Task<ActionResult<PodcastEntryViewModel>> PreProcess(PodcastEntryViewModel item) {
            var entry = await _repository.GetAsync(item.Id);
            entry.ProcessingStatus = ProcessingStatus.Accepted;
            var response = _processor.GetInformation(item.Id);
            entry.ProcessingStatus = ProcessingStatus.Processing;
            await _unitOfWork.CompleteAsync();

            var result = _mapper.Map<PodcastEntry, PodcastEntryViewModel>(entry);
            return result;
        }

        [HttpPost("resubmit")]
        public async Task<IActionResult> ReSubmit([FromBody] PodcastEntryViewModel item) {
            var entry = await _repository.GetAsync(item.Id);
            entry.ProcessingStatus = ProcessingStatus.Processing;
            await _unitOfWork.CompleteAsync();
            if (entry.ProcessingStatus != ProcessingStatus.Processed) {
                _processEntry(entry);
            }
            return Ok(entry);
        }
    }
}
