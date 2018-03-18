using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using PodNoms.Api.Persistence;
using PodNoms.Api.Services.Hubs;

namespace PodNoms.Api.Controllers {
    [Authorize]
    [Route("[controller]")]
    public class ChatterController : Controller {
        private readonly IUserRepository _repository;
        private readonly HubLifetimeManager<ChatterHub> _chatterHub;
        public ChatterController(IUserRepository repository, HubLifetimeManager<ChatterHub> chatterHub) {
            this._chatterHub = chatterHub;
            this._repository = repository;
        }
        [HttpPost("ping")]
        public async Task<ActionResult<string>> Ping([FromBody] string message) {
            var email = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;

            var user = await this._repository.GetAsync(email);
            await _chatterHub.SendAllAsync(
                $"{user.Uid}_chatter",
                new object[] { message });
            return Ok(message);
        }
    }
}