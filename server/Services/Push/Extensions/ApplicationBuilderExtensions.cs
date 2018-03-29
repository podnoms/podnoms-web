using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using PodNoms.Api.Services.Push.Data;

namespace PodNoms.Api.Services.Push.Extensions {
    public static class ApplicationBuilderExtensions {
        public static IApplicationBuilder UseSqlitePushSubscriptionStore(this IApplicationBuilder app) {
            using (var serviceScope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope()) {
                PushSubscriptionContext context = serviceScope.ServiceProvider.GetService<PushSubscriptionContext>();
                context.Database.EnsureCreated();
            }

            return app;
        }
    }
}