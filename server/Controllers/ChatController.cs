using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using PodNoms.Api.Models.ViewModels;
using PodNoms.Api.Services.Auth;
using PodNoms.Api.Services.Hubs;

namespace PodNoms.Api.Controllers {
    [Route("[controller]")]
    [Authorize]
    public class ChatController : BaseAuthController {
        private readonly HubLifetimeManager<ChatHub> _hub;

        public ChatController(IHttpContextAccessor contextAccessor, UserManager<ApplicationUser> userManager,
            HubLifetimeManager<ChatHub> chatHubContext) :
            base(contextAccessor, userManager) {
            this._hub = chatHubContext;
        }

        [HttpPost]
        public async Task<ActionResult<ChatViewModel>> Post([FromBody]ChatViewModel message) {
            await this._hub.SendAllAsync("SendMessage", new object[] { message.Message });
            return Ok(message);
        }
    }
}
