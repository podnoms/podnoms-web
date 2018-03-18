using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace PodNoms.Api.Services.Hubs {
    [Authorize]
    public class ChatterHub : Hub {
        public async Task SendMessage(string user, string message) {
            string timestamp = DateTime.Now.ToShortTimeString();
            await Clients.All.SendAsync($"{user}_chatter", timestamp, user, message);
        }
    }
}