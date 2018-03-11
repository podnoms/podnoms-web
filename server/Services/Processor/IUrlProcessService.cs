using System.Threading.Tasks;
using PodNoms.Api.Models;

namespace PodNoms.Api.Services.Processor {
    public interface IUrlProcessService {

        Task<AudioType> GetInformation(int entryId);
        Task<AudioType> GetInformation(PodcastEntry entry);
        Task<bool> DownloadAudio(int entryId);
    }
}