using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using PodNoms.Api.Persistence;

namespace PodNoms.Api.Providers {
    public static class WebHostExtensions {
        public static IWebHost MigrateDatabase(this IWebHost webHost, bool migrate, bool dropFirst) {
            var serviceScopeFactory = (IServiceScopeFactory)webHost.Services.GetService(typeof(IServiceScopeFactory));
            using (var scope = serviceScopeFactory.CreateScope()) {
                var services = scope.ServiceProvider;
                var dbContext = services.GetRequiredService<PodNomsDbContext>();
                if (dropFirst) dbContext.Database.EnsureDeleted();
                if (migrate) dbContext.Database.EnsureCreated();
            }
            return webHost;
        }
    }
}