#region imports
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Hangfire;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using PodNoms.Api.Models;
using PodNoms.Api.Models.ViewModels;
using PodNoms.Api.Persistence;
using PodNoms.Api.Services.Auth;
using PodNoms.Api.Services.Processor;
using PodNoms.Api.Utils.Extensions;
#endregion
namespace PodNoms.Api.Controllers {
    [Authorize]
    [Route("[controller]")]
    public class PodcastController : BaseAuthController {
        private readonly IPodcastRepository _repository;
        private readonly IOptions<AppSettings> _settings;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _uow;

        public PodcastController(IPodcastRepository repository, IOptions<AppSettings> options,
                    IMapper mapper, IUnitOfWork unitOfWork,
                    UserManager<ApplicationUser> userManager, IHttpContextAccessor contextAccessor)
            : base(contextAccessor, userManager) {
            this._uow = unitOfWork;
            this._repository = repository;
            this._settings = options;
            this._mapper = mapper;
        }

        [HttpGet]
        public async Task<IEnumerable<PodcastViewModel>> Get() {
            var podcasts = await _repository.GetAllAsync(_applicationUser.Id);
            var ret = _mapper.Map<List<Podcast>, List<PodcastViewModel>>(podcasts.ToList());
            return ret;
        }

        [HttpGet("{slug}")]
        public async Task<IActionResult> GetBySlug(string slug) {
            var email = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
            if (!string.IsNullOrEmpty(email)) {
                var podcast = await _repository.GetAsync(email, slug);
                if (podcast == null)
                    return NotFound();
                return new OkObjectResult(_mapper.Map<Podcast, PodcastViewModel>(podcast));
            }
            throw new Exception("No local user stored!");
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] PodcastViewModel vm) {
            if (ModelState.IsValid) {
                var item = _mapper.Map<PodcastViewModel, Podcast>(vm);
                item.AppUser = _applicationUser;
                var ret = await _repository.AddOrUpdateAsync(item);
                await _uow.CompleteAsync();
                return new OkObjectResult(_mapper.Map<Podcast, PodcastViewModel>(ret));
            }
            return BadRequest("Invalid podcast model");
        }

        [HttpPut]
        public async Task<IActionResult> Put([FromBody] PodcastViewModel vm) {
            if (ModelState.IsValid) {
                var podcast = await _repository.GetAsync(vm.Id);
                if (podcast != null) {
                    var item = _mapper.Map<PodcastViewModel, Podcast>(vm, podcast);

                    await _uow.CompleteAsync();
                    return new OkObjectResult(_mapper.Map<Podcast, PodcastViewModel>(podcast));
                }
            }
            return BadRequest("Invalid request data");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id) {
            await this._repository.DeleteAsync(id);
            await _uow.CompleteAsync();
            return Ok();
        }
    }
}