using System.Threading.Tasks;
using NYoutubeDL;
using Microsoft.Extensions.Logging;

using PodNoms.Api.Services.Jobs;
using PodNoms.Api.Services;

namespace PodNoms.Api.Services.Jobs {
    public class UpdateYouTubeDlJob : IJob {
        private readonly IMailSender _sender;
        private readonly ILogger _logger;

        public UpdateYouTubeDlJob(IMailSender sender, ILogger<UpdateYouTubeDlJob> logger){
            this._sender = sender;
            this._logger = logger;
        }

        public async Task Execute() {
            _logger.LogInformation("Updating YoutubeDL");

            var yt = new YoutubeDL();
            yt.Options.GeneralOptions.Update = true;
            yt.Download("https://www.youtube.com/watch?v=OJ2wOKDzKyI");

            var results = await _sender.SendEmailAsync("fergal.moran@gmail.com", "PodNoms: UpdateYouTubeDlJob completed", "As you were");
            _logger.LogInformation($"{results}");
        }
    }
}
