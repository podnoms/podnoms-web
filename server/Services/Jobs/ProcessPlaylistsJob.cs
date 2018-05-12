using System;
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
using PodNoms.Api.Models.Settings;
using PodNoms.Api.Persistence;
using PodNoms.Api.Services.Downloader;
using PodNoms.Api.Utils.RemoteParsers;
using static NYoutubeDL.Helpers.Enums;

namespace PodNoms.Api.Services.Jobs {
    public class ProcessPlaylistsJob : IJob {
        public readonly IPlaylistRepository _playlistRepository;
        public readonly IEntryRepository _entryRepository;
        private readonly HelpersSettings _helpersSettings;
        private readonly ILogger<ProcessPlaylistsJob> _logger;
        private readonly YouTubeParser _youTubeParser;
        private readonly MixcloudParser _mixcloudParser;
        private readonly IUnitOfWork _unitOfWork;

        public ProcessPlaylistsJob(IPlaylistRepository playlistRepository, IEntryRepository entryRepository,
                                IUnitOfWork unitOfWork, IOptions<HelpersSettings> helpersSettings,
                                ILoggerFactory logger, YouTubeParser youTubeParser, MixcloudParser mixcloudParser) {
            this._unitOfWork = unitOfWork;
            this._youTubeParser = youTubeParser;
            this._mixcloudParser = mixcloudParser;
            this._playlistRepository = playlistRepository;
            this._entryRepository = entryRepository;
            this._helpersSettings = helpersSettings.Value;
            this._logger = logger.CreateLogger<ProcessPlaylistsJob>();
        }

        public async Task Execute() {
            var playlists = _playlistRepository.GetAll()
                .ToList();

            foreach (var playlist in playlists) {
                await Execute(playlist.Id);
            }
        }
        public async Task Execute(int playlistId) {
            try {
                var playlist = await _playlistRepository.GetAsync(playlistId);
                var resultList = new List<ParsedItemResult>();

                var downloader = new AudioDownloader(playlist.SourceUrl, _helpersSettings.Downloader);
                var info = downloader.GetInfo();
                var id = ((PlaylistDownloadInfo)downloader.RawProperties)?.Id;
                if (!string.IsNullOrEmpty(id)) {
                    if (YouTubeParser.ValidateUrl(playlist.SourceUrl)) {
                        var searchTerm = (playlist.SourceUrl.Contains("/user/")) ? "forUsername" : "id";
                        resultList = await _youTubeParser.GetPlaylistEntriesForId(id);
                        //make sure the items are sorted in ascending date order
                        //so they will be processed in the order they were created
                    } else if (MixcloudParser.ValidateUrl(playlist.SourceUrl)) {
                        resultList = await _mixcloudParser.GetEntries(playlist.SourceUrl);
                    }
                    if (resultList != null) { 
                        //order in reverse so the newest item is added first
                        foreach (var item in resultList?.OrderBy(r => r.UploadDate)) {
                            if (!playlist.ParsedPlaylistItems.Any(p => p.VideoId == item.Id)) {
                                playlist.ParsedPlaylistItems.Add(new ParsedPlaylistItem {
                                    VideoId = item.Id,
                                    VideoType = item.VideoType
                                });
                                await _unitOfWork.CompleteAsync();
                                BackgroundJob.Enqueue<ProcessPlaylistItemJob>(service => service.ExecuteForItem(item.Id, playlist.Id));
                            }
                        }
                    }
                }
            } catch (Exception ex) {
                _logger.LogError(ex.Message);
            }
        }
    }
}