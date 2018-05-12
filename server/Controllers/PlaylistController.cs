using System.Threading.Tasks;
using AutoMapper;
using Hangfire;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PodNoms.Api.Models;
using PodNoms.Api.Models.ViewModels;
using PodNoms.Api.Persistence;
using PodNoms.Api.Services.Jobs;

namespace PodNoms.Api.Controllers {
    [Route("[controller]")]
    public class PlaylistController : Controller {
        private readonly IPlaylistRepository _playlistRepository;
        private readonly IPodcastRepository _podcastRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly ILogger _logger;

        public PlaylistController(IPlaylistRepository playlistRepository, IPodcastRepository podcastRepository,
                IUnitOfWork unitOfWork, IMapper mapper, ILoggerFactory logger) {
            this._logger = logger.CreateLogger<EntryController>();
            this._playlistRepository = playlistRepository;
            this._podcastRepository = podcastRepository;
            this._unitOfWork = unitOfWork;
            this._mapper = mapper;
        }

        [HttpPost]
        public async Task<ActionResult<Playlist>> Post([FromBody] PodcastEntryViewModel entry) {
            var podcast = await _podcastRepository.GetAsync(entry.PodcastId);
            if (podcast != null) {
                var playlist = new Playlist() {
                    Podcast = podcast,
                    SourceUrl = entry.SourceUrl
                };
                _playlistRepository.AddOrUpdate(playlist);
                await _unitOfWork.CompleteAsync();
                BackgroundJob.Enqueue<ProcessPlaylistsJob>(job => job.Execute(playlist.Id));
                return Ok(playlist);
            }
            return NotFound();
        }
    }
}
