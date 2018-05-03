using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using NYoutubeDL.Models;
using PodNoms.Api.Models;
using PodNoms.Api.Persistence;
using PodNoms.Api.Services.Downloader;
using static NYoutubeDL.Helpers.Enums;

namespace PodNoms.Api.Services.Jobs {
    public class ProcessPlaylistsJob : IJob {
        public readonly IPlaylistRepository _playlistRepository;
        public readonly IEntryRepository _entryRepository;
        private readonly ApplicationsSettings _applicationsSettings;
        private readonly ILogger<ProcessPlaylistsJob> _logger;

        public ProcessPlaylistsJob(IPlaylistRepository playlistRepository,
        IEntryRepository entryRepository, IOptions<ApplicationsSettings> applicationsSettings, ILoggerFactory logger) {
            _playlistRepository = playlistRepository;
            _entryRepository = entryRepository;
            _applicationsSettings = applicationsSettings.Value;
            _logger = logger.CreateLogger<ProcessPlaylistsJob>();
        }

        public async Task Execute() {
            var playists = await _playlistRepository.GetAllAsync();

            foreach (var playlist in playists) {
                var downloader = new AudioDownloader(playlist.SourceUrl, _applicationsSettings.Downloader);
                var info = await downloader.GetInfo();
                if (info == AudioType.Playlist && downloader.RawProperties is PlaylistDownloadInfo) {
                    var list = ((PlaylistDownloadInfo)downloader.RawProperties).Videos
                                .OrderByDescending(x => x.Id)
                                .Take(10);
                    StringBuilder br = new StringBuilder();
                    foreach (var item in list) {
                        _logger.LogDebug($"Processing: {item.Id} - {item.Url}");
                        br.Append($"Processing: {item.Id} - {item.Title}\n");

                        var outputDir = Path.Combine(Path.GetTempPath(), Path.GetRandomFileName());
                        Directory.CreateDirectory(outputDir);

                        var yt = new NYoutubeDL.YoutubeDL(playlist.SourceUrl);
                        yt.Options.PostProcessingOptions.ExtractAudio = true;
                        yt.Options.PostProcessingOptions.AudioFormat = AudioFormat.mp3;
                        yt.Options.VideoSelectionOptions.PlaylistItems = "1,2,3";
                        yt.Options.FilesystemOptions.Output = Path.Combine(outputDir, "%(playlist)s/%(playlist_index)s - %(title)s.%(ext)s");

                        var p = yt.Download();
                        p.WaitForExit();
                    }
                    _logger.LogDebug(br.ToString());
                }
            }
        }
    }
}