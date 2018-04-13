using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using PodNoms.Api.Models;
using PodNoms.Api.Persistence;
using PodNoms.Api.Services.Downloader;

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
                if (info == AudioType.Playlist){
                    //var 
                    //for (var item in downloader.Properties.)
                }
            }
        }
    }
}