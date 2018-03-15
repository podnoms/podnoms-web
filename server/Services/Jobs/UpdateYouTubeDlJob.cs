using System.Threading.Tasks;
using NYoutubeDL;
using PodNoms.Api.Services.Jobs;

namespace PodNoms.Api.Services.Jobs {
    public class UpdateYouTubeDlJob : IJob {
        public async Task Execute() {
            await Task.Run(() => {
                var yt = new YoutubeDL();
                yt.Options.GeneralOptions.Update = true;
                yt.Download("https://www.youtube.com/watch?v=OJ2wOKDzKyI");
            });
        }
    }
}