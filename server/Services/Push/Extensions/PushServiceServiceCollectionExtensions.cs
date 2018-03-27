using Lib.Net.Http.WebPush.Authentication;
using Microsoft.Extensions.DependencyInjection;
using PodNoms.Api.Services.Push;
using PodNoms.Api.Services.Push.Data;

namespace PodNoms.Api.Services.Push.Extensions {
    public static class PushServiceServiceCollectionExtensions {
        public static IServiceCollection AddPushServicePushNotificationService(this IServiceCollection services) {
            services.AddMemoryCache();
            services.AddSingleton<IVapidTokenCache, MemoryVapidTokenCache>();
            services.AddSingleton<IPushNotificationService, FirebasePushNotificationService>();
            return services;
        }
    }
}