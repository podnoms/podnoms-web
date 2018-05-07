using System;
using System.IO;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json.Linq;
using PodNoms.Api.Models;
using PodNoms.Api.Models.ViewModels;
using PodNoms.Api.Persistence;
using PodNoms.Api.Services.Realtime;
using PodNoms.Api.Services.Storage;

namespace PodNoms.Api.Services.Processor {
    internal class AudioUploadProcessService : ProcessService, IAudioUploadProcessService {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IEntryRepository _repository;
        private readonly IFileUploader _fileUploader;
        private readonly AudioFileStorageSettings _audioStorageSettings;

        public AudioUploadProcessService(IEntryRepository repository, IUnitOfWork unitOfWork,
            IFileUploader fileUploader, IOptions<AudioFileStorageSettings> audioStorageSettings,
            ILoggerFactory logger, IMapper mapper, IRealTimeUpdater realtimeUpdater) : base(logger, mapper, realtimeUpdater) {
            this._repository = repository;
            this._unitOfWork = unitOfWork;
            this._fileUploader = fileUploader;
            this._audioStorageSettings = audioStorageSettings.Value;
        }
        public async Task<bool> UploadAudio(int entryId, string localFile) {
            var entry = await _repository.GetAsync(entryId);
            if (entry == null) {
                _logger.LogError($"Unable to find entry with id: {entryId}");
                return false;
            }
            entry.ProcessingStatus = ProcessingStatus.Uploading;
            await _unitOfWork.CompleteAsync();
            try {
                // bit messy but can't figure how to pass youtube-dl job result to this job
                // so using AudioUrl as a proxy
                if (string.IsNullOrEmpty(localFile))
                    localFile = entry.AudioUrl;

                if (File.Exists(localFile)) {
                    var fileName = new FileInfo(localFile).Name;
                    await _fileUploader.UploadFile(localFile, _audioStorageSettings.ContainerName, fileName,
                        "application/mpeg",
                        async (p, t) => {
                            if (p % 1 == 0) {
                                await _sendProgressUpdate(
                                    entry.Podcast.AppUser.Id,
                                    entry.Uid,
                                    new ProcessProgressEvent {
                                        Percentage = p,
                                        CurrentSpeed = string.Empty,
                                        TotalSize = t.ToString()
                                    });
                            }
                        });
                    entry.Processed = true;
                    entry.ProcessingStatus = ProcessingStatus.Processed;
                    entry.AudioUrl = $"{_audioStorageSettings.ContainerName}/{fileName}";
                    await _unitOfWork.CompleteAsync();
                    await _sendProcessCompleteMessage(entry);
                    return true;
                } else {
                    _logger.LogError($"Error uploading audio file: {entry.AudioUrl} does not exist");
                    entry.ProcessingStatus = ProcessingStatus.Failed;
                    entry.ProcessingPayload = $"Unable to find {entry.AudioUrl}";
                    await _unitOfWork.CompleteAsync();
                    await _sendProcessCompleteMessage(entry);
                }
            } catch (Exception ex) {
                _logger.LogError($"Error uploading audio file: {ex.Message}");
                entry.ProcessingStatus = ProcessingStatus.Failed;
                entry.ProcessingPayload = ex.Message;
                await _unitOfWork.CompleteAsync();
                await _sendProcessCompleteMessage(entry);
            }
            return false;
        }
    }
}