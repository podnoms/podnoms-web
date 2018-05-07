using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Hangfire;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using NYoutubeDL.Models;
using PodNoms.Api.Models;
using PodNoms.Api.Persistence;
using PodNoms.Api.Services.Downloader;
using PodNoms.Api.Utils.RemoteParsers;
using static NYoutubeDL.Helpers.Enums;

namespace PodNoms.Api.Services.Jobs {
    public class ProcessPlaylistsJob : IJob {
        public readonly IPlaylistRepository _playlistRepository;
        public readonly IEntryRepository _entryRepository;
        private readonly ApplicationsSettings _applicationsSettings;
        private readonly ILogger<ProcessPlaylistsJob> _logger;
        private readonly YouTubeParser _youTubeParser;
        private readonly MixcloudParser _mixcloudParser;
        private readonly IUnitOfWork _unitOfWork;

        public ProcessPlaylistsJob(IPlaylistRepository playlistRepository, IEntryRepository entryRepository,
                                IUnitOfWork unitOfWork, IOptions<ApplicationsSettings> applicationsSettings,
                                ILoggerFactory logger, YouTubeParser youTubeParser, MixcloudParser mixcloudParser) {
            this._unitOfWork = unitOfWork;
            this._youTubeParser = youTubeParser;
            this._mixcloudParser = mixcloudParser;
            this._playlistRepository = playlistRepository;
            this._entryRepository = entryRepository;
            this._applicationsSettings = applicationsSettings.Value;
            this._logger = logger.CreateLogger<ProcessPlaylistsJob>();
        }

        public async Task Execute() {
            var playlists = await _playlistRepository.GetAllAsync();
            var resultList = new List<ParsedItemResult>();

            foreach (var playlist in playlists) {
                var downloader = new AudioDownloader(playlist.SourceUrl, _applicationsSettings.Downloader);
                var info =  downloader.GetInfo();
                var id = ((PlaylistDownloadInfo)downloader.RawProperties).Id;
                if (info == AudioType.Playlist && downloader.RawProperties is PlaylistDownloadInfo) {
                    if (_youTubeParser.ValidateUrl(playlist.SourceUrl)) {
                        var searchTerm = (playlist.SourceUrl.Contains("/user/")) ? "forUsername" : "id";
                        resultList = await _youTubeParser.GetPlaylistEntriesForId(id);
                        //make sure the items are sorted in ascending date order
                        //so they will be processed in the order they were created
                    } else if (_mixcloudParser.ValidateUrl(playlist.SourceUrl)) {
                        resultList = await _mixcloudParser.GetEntries(id);
                    }

                }
                foreach (var item in resultList?.OrderBy(r => r.UploadDate)) {
                    if (!playlist.ParsedPlaylistItems.Any(p => p.VideoId == item.Id)) {
                        playlist.ParsedPlaylistItems.Add(new ParsedPlaylistItem {
                            VideoId = item.Id,
                            VideoType = item.VideoType
                        });
                        BackgroundJob.Enqueue<ProcessPlaylistItemJob>(service => service.ExecuteForItem(item.Id, playlist.Id));
                    }
                }
                await _unitOfWork.CompleteAsync();
            }
        }
    }
}