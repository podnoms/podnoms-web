using System.Net;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using PusherServer;

namespace PodNoms.Api.Services.Realtime
{
    public class PusherUpdater : IRealTimeUpdater
    {
        private readonly Pusher _pusher;

        public PusherUpdater(IConfiguration config)
        {
            var options = new PusherOptions();
            options.Cluster = config["Pusher:Cluster"];
            this._pusher = new Pusher(
                config["Pusher:AppId"],
                config["Pusher:Key"],
                config["Pusher:Secret"],
                options);
        }

        public async Task<bool> SendProcessUpdate(string userId, string channelName, string eventName, object data)
        {
            var result = await _pusher.TriggerAsync(
                    $"{userId}__{channelName}",
                    eventName,
                    data);
            return result.StatusCode == HttpStatusCode.OK;
        }
    }
}