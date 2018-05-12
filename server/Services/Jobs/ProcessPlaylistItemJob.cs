using System.Threading.Tasks;
using Hangfire;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using PodNoms.Api.Models;
using PodNoms.Api.Models.Settings;
using PodNoms.Api.Persistence;
using PodNoms.Api.Services.Downloader;
using PodNoms.Api.Services.Processor;
using PodNoms.Api.Utils.RemoteParsers;

namespace PodNoms.Api.Services.Jobs {
    public class ProcessPlaylistItemJob : IJob {
        public readonly IPlaylistRepository _playlistRepository;
        public readonly IEntryRepository _entryRepository;
        private readonly IAudioUploadProcessService _uploadService;
        private readonly IConfiguration _options;
        private readonly IPodcastRepository _podcastRepository;
        private readonly HelpersSettings _helpersSettings;
        private readonly ILogger<ProcessPlaylistItemJob> _logger;
        private readonly IUnitOfWork _unitOfWork;
        public ProcessPlaylistItemJob(IPlaylistRepository playlistRepository, IEntryRepository entryRepository,
                        IAudioUploadProcessService uploadService, IConfiguration options,
                        IPodcastRepository podcastRepository, IOptions<HelpersSettings> _helpersSettings,
                        IUnitOfWork unitOfWork, ILogger<ProcessPlaylistItemJob> logger) {
            this._unitOfWork = unitOfWork;
            this._playlistRepository = playlistRepository;
            this._entryRepository = entryRepository;
            this._uploadService = uploadService;
            this._options = options;
            this._podcastRepository = podcastRepository;
            this._helpersSettings = _helpersSettings.Value;
            this._logger = logger;
        }
        public async Task Execute() {
            var items = await _playlistRepository.GetUnprocessedItems();
            foreach (var item in items) {
                await ExecuteForItem(item.VideoId, item.Playlist.Id);
            }
        }
        public async Task ExecuteForItem(string itemId, int playlistId) {
            var item = await _playlistRepository.GetParsedItem(itemId, playlistId);
            if (item != null && !string.IsNullOrEmpty(item.VideoType) && item.VideoType.Equals("youtube")) {
                var url = $"https://www.youtube.com/watch?v={item.VideoId}";
                var downloader = new AudioDownloader(url, _helpersSettings.Downloader);
                var info =  downloader.GetInfo();
                if (info == AudioType.Valid) {
                    var podcast = await _podcastRepository.GetAsync(item.Playlist.PodcastId);
                    var uid = System.Guid.NewGuid().ToString();
                    var file = downloader.DownloadAudio(uid);
                    if (System.IO.File.Exists(file)) {
                        //we have the file so lets create the entry and ship to CDN
                        var entry = new PodcastEntry {
                            Title = downloader.Properties?.Title,
                            Description = downloader.Properties?.Description,
                            ProcessingStatus = ProcessingStatus.Uploading,
                            ImageUrl = downloader.Properties?.Thumbnail
                        };
                        podcast.PodcastEntries.Add(entry);
                        await _unitOfWork.CompleteAsync();
                        var uploaded = await _uploadService.UploadAudio(entry.Id, file);
                        if (uploaded) {
                            item.IsProcessed = true;
                            await _unitOfWork.CompleteAsync();
                            BackgroundJob.Enqueue<INotifyJobCompleteService>(
                                service => service.NotifyUser(entry.Podcast.AppUser.Id, "PodNoms", $"{entry.Title} has finished processing",
                                    entry.Podcast.GetThumbnailUrl(
                                        this._options.GetSection("Storage")["CdnUrl"],
                                        this._options.GetSection("ImageFileStorageSettings")["ContainerName"])
                                    ));
                        }
                    }
                } else {
                    _logger.LogError($"Processing playlist item {itemId} failed");
                }
            }
        }
    }
}