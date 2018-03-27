using System.Threading.Tasks;
using Lib.Net.Http.WebPush;
using PodNoms.Api.Services.Push;
using WebPush = Lib.Net.Http.WebPush;

namespace PodNoms.Api.Services.Jobs {
    public class NotifyJobCompleteService : INotifyJobCompleteService {
        private readonly IPushSubscriptionStore _subscriptionStore;
        private readonly IPushNotificationService _notificationService;

        public NotifyJobCompleteService(IPushSubscriptionStore subscriptionStore,
                IPushNotificationService notificationService) {
            this._notificationService = notificationService;
            this._subscriptionStore = subscriptionStore;

        }
        public async Task NotifyUser(string userId, string title, string body, string image) {
            WebPush.PushMessage pushMessage = new WebPush.PushMessage(body) {
                Topic = title,
                Urgency = PushMessageUrgency.Normal
            };
            await _subscriptionStore.ForEachSubscriptionAsync(userId, (WebPush.PushSubscription subscription) => {
                _notificationService.SendNotificationAsync(subscription, pushMessage);
            });
        }
    }
}
