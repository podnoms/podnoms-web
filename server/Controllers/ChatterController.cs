using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using PodNoms.Api.Persistence;
using PodNoms.Api.Services.Auth;
using PodNoms.Api.Services.Hubs;

namespace PodNoms.Api.Controllers {
    [Authorize]
    [Route("[controller]")]
    public class ChatterController : BaseAuthController {
        private readonly HubLifetimeManager<ChatterHub> _chatterHub;
        public ChatterController(HubLifetimeManager<ChatterHub> chatterHub, UserManager<ApplicationUser> userManager, IHttpContextAccessor contextAccessor)
            : base(contextAccessor, userManager) {
            this._chatterHub = chatterHub;
        }
        [HttpPost("ping")]
        public async Task<ActionResult<string>> Ping([FromBody] string message) {
            await _chatterHub.SendAllAsync(
                $"{_applicationUser.Id}_chatter",
                new object[] { message });
            return Ok(message);
        }
    }
}