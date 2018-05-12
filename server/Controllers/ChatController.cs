using System.Threading.Tasks;
using AutoMapper;
using Lib.Net.Http.WebPush;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Options;
using PodNoms.Api.Models;
using PodNoms.Api.Models.Settings;
using PodNoms.Api.Models.ViewModels;
using PodNoms.Api.Persistence;
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
        private readonly IChatRepository _chatRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public ChatController(IHttpContextAccessor contextAccessor, UserManager<ApplicationUser> userManager,
                            IMapper mapper, IUnitOfWork unitOfWork, IChatRepository chatRepository, ISupportChatService supportChatService) :
            base(contextAccessor, userManager) {
            this._chatRepository = chatRepository;
            this._unitOfWork = unitOfWork;
            this._mapper = mapper;
            this._supportChatService = supportChatService;
        }

        [HttpGet]
        public async Task<ActionResult<ChatViewModel>> Get() {
            var chats = await _chatRepository.GetAllChats(_userId);
            var response = _mapper.Map<ChatViewModel>(chats);
            return Ok(response);
        }
        [HttpPost]
        public async Task<ActionResult<ChatViewModel>> Post([FromBody]ChatViewModel message) {
            //need to lookup the current support host and notify them
            message.FromUserName = _applicationUser.FullName;
            message.FromUserId = _applicationUser.Id;
            var chat = _mapper.Map<ChatMessage>(message);
            _chatRepository.AddOrUpdate(chat);
            await this._unitOfWork.CompleteAsync();

            if (await _supportChatService.InitiateSupportRequest(_userId, message)) {
                return Ok(message);
            }
            return Accepted(message);
        }
    }
}
