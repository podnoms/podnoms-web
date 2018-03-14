using System.Threading.Tasks;
using Hangfire;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PodNoms.Api.Services.Jobs;

namespace PodNoms.Api.Controllers
{
    [Authorize]
    [Route("[controller]")]
    [ApiExplorerSettings(IgnoreApi = true)]
    public class JobController : Controller
    {
        [HttpGet("processorphans")]
        public IActionResult ProcessOrphans()
        {
            var infoJobId = BackgroundJob.Enqueue<ClearOrphanAudioJob>(service => service.Execute());
            return Ok();
        }
    }
}