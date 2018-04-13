using System.Threading.Tasks;

namespace PodNoms.Api.Services.Realtime {
    public interface IRealTimeUpdater {
        Task<bool> SendProcessUpdate(string userId, string channelName, string eventName, object data);
    }
}