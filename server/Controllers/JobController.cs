using System.Threading.Tasks;
using Hangfire;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PodNoms.Api.Services.Jobs;

namespace PodNoms.Api.Controllers {
    [Authorize]
    [Route("[controller]")]
    [ApiExplorerSettings(IgnoreApi = true)]
    public class JobController : Controller {
        [HttpGet("processorphans")]
        public IActionResult ProcessOrphans() {
            var infoJobId = BackgroundJob.Enqueue<ClearOrphanAudioJob>(service => service.Execute());
            return Ok();
        }
        [HttpGet("processplaylists")]
        public IActionResult ProcessPlaylists() {
            var infoJobId = BackgroundJob.Enqueue<ProcessPlaylistsJob>(service => service.Execute());
            return Ok();
        }
        [HttpGet("updateyoutubedl")]
        public IActionResult UpdateYouTubeDl() {
            var infoJobId = BackgroundJob.Enqueue<UpdateYouTubeDlJob>(service => service.Execute());
            return Ok();
        }
    }
}