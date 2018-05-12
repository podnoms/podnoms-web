using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace PodNoms.Api.Services.Hubs {
    [Authorize]
    public class UserUpdatesHub : Hub {
        public async Task SendMessage(string userId, string message) {
            string timestamp = DateTime.Now.ToShortTimeString();
            await Clients.All.SendAsync(userId, timestamp, userId, message);
        }
    }
}