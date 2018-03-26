using System.Threading.Tasks;
using Lib.Net.Http.WebPush;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PodNoms.Api.Services.Push;
using PodNoms.Api.Services.Push.Models;

namespace PodNoms.Api.Controllers {

    // [Authorize]
    [Route("[controller]")]
    public class WebPushController : Controller {
        private readonly IPushSubscriptionStore _subscriptionStore;
        public readonly IPushNotificationService _notificationService;

        public WebPushController(IPushSubscriptionStore subscriptionStore, IPushNotificationService notificationService) {
            this._subscriptionStore = subscriptionStore;
            this._notificationService = notificationService;
        }

        [HttpPost("subscribe")]
        public async Task<IActionResult> StoreSubscription([FromBody]PushSubscription subscription) {
            await _subscriptionStore.StoreSubscriptionAsync(subscription);
            return NoContent();
        }

        // POST push-notifications-api/notifications
        [HttpPost("message")]
        public async Task<IActionResult> SendNotification([FromBody]PushMessageViewModel message) {
            PushMessage pushMessage = new PushMessage(message.Notification) {
                Topic = message.Topic,
                Urgency = message.Urgency
            };

            // TODO: This should be scheduled in background
            await _subscriptionStore.ForEachSubscriptionAsync((PushSubscription subscription) => {
                // Fire-and-forget 
                _notificationService.SendNotificationAsync(subscription, pushMessage);
            });

            return NoContent();
        }
    }
}
