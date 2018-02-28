using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace PodNoms.Api.Services.Hubs {
    [Authorize (AuthenticationSchemes = "Bearer")]
    public class DebugHub : Hub {
        public async Task Send (string message) {
            await Clients.All.SendAsync ("Send", message);
        }
    }
}