using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;

namespace PodNoms.Api.Services.Auth {
    public class SignalRUserIdProvider : IUserIdProvider {
        // private readonly UserManager<ApplicationUser> _userManager;

        // public SignalRUserIdProvider(UserManager<ApplicationUser> userManager) {
        //     this._userManager = userManager;
        // }
        /// <inheritdoc />
        public virtual string GetUserId(HubConnectionContext connection) {
            var id =  connection.User?.FindFirst(c => c.Type == "id")?.Value;
            return id;
        }
    }
}