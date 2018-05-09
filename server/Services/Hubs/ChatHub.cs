using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace PodNoms.Api.Services.Hubs {
    [Authorize]
    public class ChatHub : Hub {
        public override async Task OnConnectedAsync() {
            // await Clients.All.SendAsync("SendAction", Context.User.Identity.Name, "joined");
        }

        public override async Task OnDisconnectedAsync(Exception ex) {
            // await Clients.All.SendAsync("SendAction", Context.User.Identity.Name, "left");
        }
        
    }
}