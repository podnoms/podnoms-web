using System.Threading.Tasks;
using WebPush = Lib.Net.Http.WebPush;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PodNoms.Api.Services.Push;
using PodNoms.Api.Services.Push.Models;
using PodNoms.Api.Persistence;
using Microsoft.AspNetCore.Identity;
using PodNoms.Api.Services.Auth;
using Microsoft.AspNetCore.Http;

namespace PodNoms.Api.Controllers {

    // [Authorize]
    [Route("[controller]")]
    public class WebPushController : BaseAuthController {
        private readonly IPushSubscriptionStore _subscriptionStore;
        public readonly IPushNotificationService _notificationService;

        public WebPushController(IPushSubscriptionStore subscriptionStore, IPushNotificationService notificationService,
                                    UserManager<ApplicationUser> userManager,
                                    IHttpContextAccessor contextAccessor) : base(contextAccessor, userManager) {
            this._subscriptionStore = subscriptionStore;
            this._notificationService = notificationService;
        }

        [HttpPost("subscribe")]
        public async Task<IActionResult> StoreSubscription([FromBody]WebPush.PushSubscription subscription) {
            subscription.Keys["auth"] = _applicationUser.Id;
            await _subscriptionStore.StoreSubscriptionAsync(subscription);
            return NoContent();
        }

        // POST push-notifications-api/notifications
        [HttpPost("message")]
        public async Task<IActionResult> SendNotification([FromBody]PushMessageViewModel message) {
            WebPush.PushMessage pushMessage = new WebPush.PushMessage(message.Notification) {
                Topic = message.Topic,
                Urgency = message.Urgency
            };

            // TODO: This should be scheduled in background
            await _subscriptionStore.ForEachSubscriptionAsync((WebPush.PushSubscription subscription) => {
                // Fire-and-forget 
                _notificationService.SendNotificationAsync(subscription, pushMessage);
            });

            return NoContent();
        }
    }
}
