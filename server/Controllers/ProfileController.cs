using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PodNoms.Api.Models;
using PodNoms.Api.Models.ViewModels;
using PodNoms.Api.Persistence;
using PodNoms.Api.Services.Auth;

namespace PodNoms.Api.Controllers {
    [Authorize]
    [Route("[controller]")]
    public class ProfileController : Controller {
        private IUserRepository _userRepository;
        private readonly UserManager<ApplicationUser> _userManager;

        public IUnitOfWork _unitOfWork { get; }

        private readonly ClaimsPrincipal _caller;

        public IMapper _mapper { get; }

        public ProfileController(IUserRepository userRepository, IMapper mapper, IUnitOfWork unitOfWork,
                    UserManager<ApplicationUser> userManager, IHttpContextAccessor httpContextAccessor) {
            this._caller = httpContextAccessor.HttpContext.User;
            this._mapper = mapper;
            this._unitOfWork = unitOfWork;
            this._userManager = userManager;
            this._userRepository = userRepository;
        }
        [HttpGet]
        public async Task<ActionResult<ProfileViewModel>> Get() {
            var userId = _caller.Claims.Single(c => c.Type == "id");
            var user = await this._userManager.FindByIdAsync(userId.Value);

            var result = _mapper.Map<ApplicationUser, ProfileViewModel>(user);
            return new OkObjectResult(result);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] ProfileViewModel item) {
            /* TODO: Update this to the new model
            var email = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
            var user = _userRepository.Get(email);

            user.Id = item.Id;
            user.EmailAddress = item.Email;
            user.FullName = item.Name;
            user.ProfileImage = item.ProfileImage;
            user.ApiKey = item.ApiKey;

            _userRepository.AddOrUpdate(user);
            await _unitOfWork.CompleteAsync();
             */
            return new OkObjectResult(item);
        }

        [HttpPost("updateapikey")]
        public async Task<ActionResult> UpdateApiKey() {
            var email = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
            var user = _userRepository.Get(email);
            if (user != null) {
                var newKey = _userRepository.UpdateApiKey(user);
                await _unitOfWork.CompleteAsync();
                return new OkObjectResult(newKey);
            }
            return new NotFoundResult();
        }
        [HttpGet("checkslug/{slug}")]
        public async Task<string> CheckSlug(string slug) {
            var result = await _userRepository.GetBySlugAsync(slug);
            if (result != null) {
                return "Found";
            }
            return "NotFound";
        }
    }
}