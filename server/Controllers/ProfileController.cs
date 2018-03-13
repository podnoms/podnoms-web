using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PodNoms.Api.Models;
using PodNoms.Api.Models.ViewModels;
using PodNoms.Api.Persistence;

namespace PodNoms.Api.Controllers
{
    [Authorize]
    [Route("[controller]")]
    public class ProfileController : Controller
    {
        private IUserRepository _userRepository;
        public IUnitOfWork _unitOfWork { get; }
        public IMapper _mapper { get; }

        public ProfileController(IUserRepository userRepository, IMapper mapper, IUnitOfWork unitOfWork)
        {
            this._mapper = mapper;
            this._unitOfWork = unitOfWork;
            this._userRepository = userRepository;
        }

        public ActionResult Get()
        {
            var email = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
            var user = _userRepository.Get(email);
            if (user != null)
            {
                var result = _mapper.Map<User, ProfileViewModel>(user);
                return new OkObjectResult(result);
            }
            return new NotFoundResult();
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] ProfileViewModel item)
        {
            var email = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
            var user = _userRepository.Get(email);

            if (user == null || user.Id != item.Id)
                return new UnauthorizedResult();

            user.Id = item.Id;
            user.EmailAddress = item.Email;
            user.FullName = item.Name;
            user.ProfileImage = item.ProfileImage;
            user.ApiKey = item.ApiKey;

            _userRepository.AddOrUpdate(user);
            await _unitOfWork.CompleteAsync();
            return new OkObjectResult(item);
        }

        [HttpPost("updateapikey")]
        public async Task<ActionResult> UpdateApiKey()
        {
            var email = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
            var user = _userRepository.Get(email);
            if (user != null)
            {
                var newKey = _userRepository.UpdateApiKey(user);
                await _unitOfWork.CompleteAsync();
                return new OkObjectResult(newKey);
            }
            return new NotFoundResult();
        }
        [HttpGet("checkslug/{slug}")]
        public async Task<string> CheckSlug(string slug){
            var result = await _userRepository.GetBySlugAsync(slug);
            if (result != null){
                return "Found";
            }
            return "NotFound";
        }
    }
}