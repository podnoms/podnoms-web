using System;
using System.Threading.Tasks;
using Lib.Net.Http.WebPush;
using Lib.Net.Http.WebPush.Authentication;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using PodNoms.Api.Services.Push.Extensions;

namespace PodNoms.Api.Services.Push {
    public class PushServicePushNotificationService : IPushNotificationService {
        private readonly PushNotificationServiceOptions _options;
        private readonly PushServiceClient _pushClient;

        private readonly ILogger _logger;

        public string PublicKey { get { return _options.PublicKey; } }

        public PushServicePushNotificationService(IOptions<PushNotificationServiceOptions> optionsAccessor, IVapidTokenCache vapidTokenCache, ILogger<PushServicePushNotificationService> logger) {
            _options = optionsAccessor.Value;

            _pushClient = new PushServiceClient {
                DefaultAuthentication = new VapidAuthentication(_options.PublicKey, _options.PrivateKey) {
                    Subject = _options.Subject,
                    TokenCache = vapidTokenCache
                }
            };

            _logger = logger;
        }

        public async Task SendNotificationAsync(PushSubscription subscription, PushMessage message) {
            try {
                await _pushClient.RequestPushMessageDeliveryAsync(subscription, message);
            } catch (Exception ex) {
                _logger?.LogError(ex, "Failed requesting push message delivery to {0}.", subscription.Endpoint);
            }
        }
    }
}
