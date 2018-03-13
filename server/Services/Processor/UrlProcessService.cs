using System;
using System.ComponentModel;
using System.Dynamic;
using System.IO;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json.Serialization;
using PodNoms.Api.Models;
using PodNoms.Api.Models.ViewModels;
using PodNoms.Api.Persistence;
using PodNoms.Api.Services.Downloader;
using PodNoms.Api.Services.Realtime;
using PodNoms.Api.Services.Storage;

namespace PodNoms.Api.Services.Processor {
    internal class UrlProcessService : ProcessService, IUrlProcessService {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IEntryRepository _repository;

        public ApplicationsSettings _applicationsSettings { get; }

        public UrlProcessService(IEntryRepository repository, IUnitOfWork unitOfWork,
            IFileUploader fileUploader, IOptions<ApplicationsSettings> applicationsSettings,
            ILoggerFactory logger, IMapper mapper, IRealTimeUpdater pusher) : base(logger, mapper, pusher) {
            this._applicationsSettings = applicationsSettings.Value;
            this._repository = repository;
            this._unitOfWork = unitOfWork;
        }

        private async Task __downloader_progress(string userId, string uid, ProcessProgressEvent e) {
            await _sendProgressUpdate(
                userId,
                uid,
                e);
        }
        public async Task<AudioType> GetInformation(int entryId) {
            var entry = await _repository.GetAsync(entryId);
            if (entry == null || string.IsNullOrEmpty(entry.SourceUrl)) {
                _logger.LogError("Unable to process item");
                return AudioType.Invalid;
            }
            if (entry.SourceUrl.EndsWith(".mp3") || entry.SourceUrl.EndsWith(".wav") || entry.SourceUrl.EndsWith(".aif")) {
                return AudioType.Valid;
            }
            return await GetInformation(entry);
        }

        public async Task<AudioType> GetInformation(PodcastEntry entry) {

            var downloader = new AudioDownloader(entry.SourceUrl, _applicationsSettings.Downloader);
            var ret = await downloader.GetInfo();
            if (ret == AudioType.Valid) {
                entry.Title = downloader.Properties?.Title;
                entry.Description = downloader.Properties?.Description;
                entry.ImageUrl = downloader.Properties?.Thumbnail;
                entry.ProcessingStatus = ProcessingStatus.Processing;
                try {
                    entry.Author = downloader.Properties?.Uploader;
                } catch (Exception) {
                    _logger.LogWarning($"Unable to extract downloader info for: {entry.SourceUrl}");
                }

                await _unitOfWork.CompleteAsync();

                _logger.LogDebug("***DOWNLOAD INFO RETRIEVED****\n");
                _logger.LogDebug($"Title: {entry.Title}\nDescription: {entry.Description}\nAuthor: {entry.Author}\n");
            }
            return ret;
        }
        public async Task<bool> DownloadAudio(int entryId) {
            var entry = await _repository.GetAsync(entryId);
            if (entry == null)
                return false;
            try {
                var downloader = new AudioDownloader(entry.SourceUrl, _applicationsSettings.Downloader);
                var outputFile =
                    Path.Combine(System.IO.Path.GetTempPath(), $"{System.Guid.NewGuid().ToString()}.mp3");

                downloader.DownloadProgress += async (s, e) => await __downloader_progress(entry.Podcast.User.GetUserId(), entry.Uid, e);

                downloader.PostProcessing += (s, e) => {
                    Console.WriteLine(e);
                };
                var sourceFile = downloader.DownloadAudio(entry.Uid);
                if (!string.IsNullOrEmpty(sourceFile)) {
                    entry.ProcessingStatus = ProcessingStatus.Uploading;
                    entry.AudioUrl = sourceFile;

                    await _sendProcessCompleteMessage(entry);
                    await _unitOfWork.CompleteAsync();
                }
            } catch (Exception ex) {
                _logger.LogError($"Entry: {entryId}\n{ex.Message}");
                entry.ProcessingStatus = ProcessingStatus.Failed;
                entry.ProcessingPayload = ex.Message;
                await _unitOfWork.CompleteAsync();
                await _sendProcessCompleteMessage(entry);
            }
            return false;
        }

    }
}
