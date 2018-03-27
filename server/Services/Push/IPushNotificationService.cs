using System.Threading.Tasks;
using Lib.Net.Http.WebPush;

namespace PodNoms.Api.Services.Push {
    public interface IPushNotificationService {
        string PublicKey { get; }
        Task SendNotificationAsync(PushSubscription subscription, PushMessage message);
    }
}