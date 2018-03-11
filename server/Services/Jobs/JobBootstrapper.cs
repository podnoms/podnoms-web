using Hangfire;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using PodNoms.Api.Models;
using PodNoms.Api.Persistence;

namespace PodNoms.Api.Services.Jobs {
    public static class JobBootstrapper {
        public static void BootstrapJobs() {
            BackgroundJob.Enqueue<ClearOrphanAudioJob>(x => x.ClearOrphanAudio());
        }
    }
}