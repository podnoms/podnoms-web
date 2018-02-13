using System;
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
using PusherServer;
using System.ComponentModel;
using System.Dynamic;
using System.IO;
using System.Threading.Tasks;

namespace PodNoms.Api.Services.Processor {
    internal class UrlProcessService : ProcessService, IUrlProcessService {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IEntryRepository _repository;

        public ApplicationsSettings _applicationsSettings { get; }

        public UrlProcessService (IEntryRepository repository, IUnitOfWork unitOfWork,
            IFileUploader fileUploader, IOptions<ApplicationsSettings> applicationsSettings,
            ILoggerFactory logger, IMapper mapper, IRealTimeUpdater pusher) : base (logger, mapper, pusher) {
            this._applicationsSettings = applicationsSettings.Value;
            this._repository = repository;
            this._unitOfWork = unitOfWork;
        }

        private async Task __downloader_progress (string userId, string uid, ProcessProgressEvent e) {
            await _sendProgressUpdate (
                userId,
                uid,
                e);
        }

        public async Task<bool> CheckUrlValid (string url) {
            return await new AudioDownloader (url, _applicationsSettings.Downloader)
                .CheckUrlValid ();
        }

        public async Task<bool> GetInformation (int entryId) {
            var entry = await _repository.GetAsync (entryId);
            if (entry == null || string.IsNullOrEmpty (entry.SourceUrl)) {
                _logger.LogError ("Unable to process item");
                return false;
            }
            if (entry.SourceUrl.EndsWith (".mp3") || entry.SourceUrl.EndsWith (".wav") || entry.SourceUrl.EndsWith (".aif")) {
                return true;
            }
            var downloader = new AudioDownloader (entry.SourceUrl, _applicationsSettings.Downloader);
            downloader.DownloadInfo ();
            if (downloader.Properties != null) {
                entry.Title = downloader.Properties?.title;
                entry.Description = downloader.Properties?.description;
                entry.ImageUrl = downloader.Properties?.thumbnail;
                entry.ProcessingStatus = ProcessingStatus.Processing;
                try {
                    entry.Author = downloader.Properties?.uploader;
                } catch (Exception) {
                    _logger.LogWarning ($"Unable to extract downloader info for: {entry.SourceUrl}");
                }

                await _unitOfWork.CompleteAsync ();

                _logger.LogDebug ("***DOWNLOAD INFO RETRIEVED****\n");
                _logger.LogDebug ($"Title: {entry.Title}\nDescription: {entry.Description}\nAuthor: {entry.Author}\n");

                var pusherResult = await _sendProcessCompleteMessage (entry);
                return true;
            }
            return false;
        }
        public async Task<bool> DownloadAudio (int entryId) {
            var entry = await _repository.GetAsync (entryId);
            if (entry == null)
                return false;

            var downloader = new AudioDownloader (entry.SourceUrl, _applicationsSettings.Downloader);
            var outputFile =
                Path.Combine (System.IO.Path.GetTempPath (), $"{System.Guid.NewGuid().ToString()}.mp3");

            downloader.DownloadProgress += async (s, e) => await __downloader_progress (entry.Podcast.User.GetUserId (), entry.Uid, e);

            downloader.PostProcessing += (s, e) => {
                Console.WriteLine (e);
            };
            var sourceFile = downloader.DownloadAudio (entry.Uid);
            if (!string.IsNullOrEmpty (sourceFile)) {
                entry.ProcessingStatus = ProcessingStatus.Uploading;
                entry.AudioUrl = sourceFile;

                await _sendProcessCompleteMessage (entry);
                await _unitOfWork.CompleteAsync ();
            }
            return false;
        }

    }
}