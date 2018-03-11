using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using PodNoms.Api.Models;
using PodNoms.Api.Persistence;

namespace PodNoms.Api.Services.Jobs {
    public class ClearOrphanAudioJob : IJob {
        public readonly IEntryRepository _entryRepository;
        public readonly StorageSettings _storageSettings;
        public readonly AudioFileStorageSettings _audioStorageSettings;
        private readonly ILogger<ClearOrphanAudioJob> _logger;

        public ClearOrphanAudioJob(IEntryRepository entryRepository, IOptions<StorageSettings> storageSettings,
            IOptions<AudioFileStorageSettings> audioStorageSettings, ILoggerFactory logger) {
            this._storageSettings = storageSettings.Value;
            this._audioStorageSettings = audioStorageSettings.Value;
            this._entryRepository = entryRepository;

            this._logger = logger.CreateLogger<ClearOrphanAudioJob>();
        }

        public async Task Execute() {
            await ClearOrphanAudio();
        }
        public async Task ClearOrphanAudio() {
            try {
                CloudStorageAccount storageAccount = CloudStorageAccount.Parse(_storageSettings.ConnectionString);
                CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();
                CloudBlobContainer container = blobClient.GetContainerReference(_audioStorageSettings.ContainerName);

                var blobs = await container.ListBlobsSegmentedAsync(null);
                foreach (CloudBlockBlob blob in blobs.Results) {
                    try {
                        Console.WriteLine(blob.StorageUri);
                        var guid = blob.Name.Split('.')[0];
                        if (!string.IsNullOrEmpty(guid)) {
                            var entry = await _entryRepository.GetByUidAsync(guid);
                            if (entry == null) {
                                await blob.DeleteIfExistsAsync();
                            }
                        }
                    } catch (Exception e) {
                        _logger.LogWarning($"Error processing blob {blob.Uri}\n{e.Message}");
                    }
                }
            } catch (Exception ex) {
                _logger.LogError($"Error clearing orphans\n{ex.Message}");
            }
        }
    }
}