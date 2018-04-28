using System;
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
    public class ProfileController : BaseAuthController {

        public IUnitOfWork _unitOfWork { get; }


        public IMapper _mapper { get; }

        public ProfileController(IMapper mapper, IUnitOfWork unitOfWork,
                UserManager<ApplicationUser> userManager, IHttpContextAccessor contextAccessor)
            : base(contextAccessor, userManager) {
            this._mapper = mapper;
            this._unitOfWork = unitOfWork;
        }
        [HttpGet]
        public async Task<ActionResult<ProfileViewModel>> Get() {
            var result = _mapper.Map<ApplicationUser, ProfileViewModel>(_applicationUser);
            return new OkObjectResult(result);
        }

        [HttpPost]
        public async Task<ActionResult<ProfileViewModel>> Post([FromBody] ProfileViewModel item) {
            _applicationUser.Slug = item.Slug;
            _applicationUser.FirstName = item.FirstName;
            _applicationUser.LastName = item.LastName;
            await _userManager.UpdateAsync(_applicationUser);
            var ret = _mapper.Map<ApplicationUser, ProfileViewModel>(_applicationUser);
            return Ok(ret);
        }

        [HttpGet("checkslug/{slug}")]
        public async Task<IActionResult> CheckSlug(string slug) {
            var slugValid = await _userManager.CheckSlug(slug);

            if (slugValid)
                return NotFound();

            return Ok();
        }
    }
}