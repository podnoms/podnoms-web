using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace PodNoms.Api.Services.Hubs {
    [Authorize]
    public class AudioProcessingHub : Hub {
        // public override async Task OnConnectedAsync()
        // {
        //     await Clients.All.InvokeAsync("Connect", $"{Context.ConnectionId} joined");
        // }
        // public override async Task OnDisconnectedAsync(Exception ex)
        // {
        //     await Clients.All.InvokeAsync("Disconnect", $"{Context.ConnectionId} left");
        // }
        private async Task SendMessage (object data) {
            await Clients.All.SendAsync ("Send", data);
        }
    }
}