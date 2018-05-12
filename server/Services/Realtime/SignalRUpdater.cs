using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using PodNoms.Api.Models.ViewModels;
using PodNoms.Api.Services.Hubs;

namespace PodNoms.Api.Services.Realtime {
    public class SignalRUpdater : IRealTimeUpdater {
        private readonly HubLifetimeManager<AudioProcessingHub> _hub;
        public SignalRUpdater(HubLifetimeManager<AudioProcessingHub> hub) {
            this._hub = hub;

        }
        public async Task<bool> SendProcessUpdate(string userId, string channelName, string eventName, object data) {
            var bus = $"{channelName}__{eventName}";
            await _hub.SendUserAsync(
                userId,
                bus, //userId, 
                new object[] { data });
            return true;
        }
    }
}