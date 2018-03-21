using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using PodNoms.Api.Services.Push.Data;

namespace PodNoms.Api.Services.Push.Extensions {
    public static class SqliteServiceCollectionExtensions {
        private const string SQLITE_CONNECTION_STRING_NAME = "PushSubscriptionSqliteDatabase";

        public static IServiceCollection AddSqlitePushSubscriptionStore(this IServiceCollection services, IConfiguration configuration) {
            services.AddDbContext<PushSubscriptionContext>(options =>
                options.UseSqlite(configuration.GetConnectionString(SQLITE_CONNECTION_STRING_NAME))
            );

            services.AddTransient<IPushSubscriptionStore, SqlitePushSubscriptionStore>();

            return services;
        }
    }
}