using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace PodNoms.Api.Services.Push.Extensions {
    public static class ServiceCollectionExtensions {
        private const string PUSH_NOTIFICATION_SERVICE_CONFIGURATION_SECTION = "PushNotificationService";

        public static IServiceCollection AddPushSubscriptionStore(this IServiceCollection services, IConfiguration configuration) {
            services.AddSqlitePushSubscriptionStore(configuration);

            return services;
        }

        public static IServiceCollection AddPushNotificationService(this IServiceCollection services, IConfiguration configuration) {
            services.AddOptions();
            services.Configure<PushNotificationServiceOptions>(configuration.GetSection(PUSH_NOTIFICATION_SERVICE_CONFIGURATION_SECTION));

            services.AddPushServicePushNotificationService();

            return services;
        }
    }
}