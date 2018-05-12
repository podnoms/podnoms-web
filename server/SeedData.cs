using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using PodNoms.Api.Models;
using PodNoms.Api.Persistence;
using PodNoms.Api.Utils.Extensions;

namespace PodNoms.Api {
    internal class SeedData {
        public static void Initialize(IServiceProvider serviceProvider) {
            using (var context = new PodNomsDbContext(serviceProvider.GetRequiredService<DbContextOptions<PodNomsDbContext>>(), null)) {
                context.Database.EnsureCreated();

                if (context.ServerConfig.Any()) {
                    return; // DB has been seeded
                }
                context.ServerConfig.Add(new ServerConfig {
                    Key = "ServerScaffoldDate",
                    Value = DateTime.Now.ToRFC822String()
                });
                context.SaveChangesAsync().Wait();
            }
        }
    }
}