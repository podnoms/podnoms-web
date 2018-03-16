using Hangfire;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using PodNoms.Api.Models;
using PodNoms.Api.Persistence;

namespace PodNoms.Api.Services.Jobs {
    public static class JobBootstrapper {
        public static void BootstrapJobs() {
            RecurringJob.AddOrUpdate<ClearOrphanAudioJob>(x => x.Execute(), Cron.Daily(1));
            RecurringJob.AddOrUpdate<UpdateYouTubeDlJob>(x => x.Execute(), Cron.Daily(1, 30));
        }
    }
}
