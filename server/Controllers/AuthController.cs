using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PodNoms.Api.Models;
using PodNoms.Api.Persistence;

namespace PodNoms.Api.Controllers {
    [Authorize]
    public class AuthController : Controller {
        protected IUserRepository _userRepository { get; }

        public AuthController(IUserRepository repository) {
            this._userRepository = repository;
        }
        protected async Task<User> GetUserAsync() {
            var identifier = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
            var user = await this._userRepository.GetAsync(identifier);
            return user;
        }
        protected async Task<string> GetUserUidAsync() {
            var user = await GetUserAsync();
            return user.Uid;
        }
        protected async Task<int> GetUserIdAsync() {
            var user = await GetUserAsync();
            return user.Id;
        }
    }
}