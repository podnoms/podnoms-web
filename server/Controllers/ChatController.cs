using System.Threading.Tasks;
using Lib.Net.Http.WebPush;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Options;
using PodNoms.Api.Models.Settings;
using PodNoms.Api.Models.ViewModels;
using PodNoms.Api.Services;
using PodNoms.Api.Services.Auth;
using PodNoms.Api.Services.Hubs;
using PodNoms.Api.Services.Push;
using WebPush = Lib.Net.Http.WebPush;

namespace PodNoms.Api.Controllers {
    [Route("[controller]")]
    [Authorize]
    public class ChatController : BaseAuthController {
        private readonly ISupportChatService _supportChatService;

        public ChatController(IHttpContextAccessor contextAccessor, UserManager<ApplicationUser> userManager,
            ISupportChatService supportChatService) :
            base(contextAccessor, userManager) {
            this._supportChatService = supportChatService;
        }

        [HttpPost]
        public async Task<ActionResult<ChatViewModel>> Post([FromBody]ChatViewModel message) {
            //need to lookup the current support host and notify them
            message.FromUserName = _applicationUser.FullName;
            message.FromUserId = _applicationUser.Id;
            if (await _supportChatService.InitiateSupportRequest(_userId, message)) {
                return Ok(message);
            }
            return Accepted(message);
        }
    }
}
