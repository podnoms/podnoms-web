using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using PodNoms.Api.Models.ViewModels;
using PodNoms.Api.Services.Hubs;

namespace PodNoms.Api.Services.Realtime {
    public class SignalRUpdater : IRealTimeUpdater {
        private readonly HubLifetimeManager<AudioProcessingHub> _hub;
        public SignalRUpdater(HubLifetimeManager<AudioProcessingHub> audioProcessingHubContext) {
            this._hub = audioProcessingHubContext;

        }
        public async Task<bool> SendProcessUpdate(string userId, string channelName, string eventName, object data) {
            var bus = $"{channelName}__{eventName}";
            await _hub.SendAllAsync(
                bus, //userId, 
                new object[] { data });
            return true;
        }
    }
}