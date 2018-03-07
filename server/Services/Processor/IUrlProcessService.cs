using System.Threading.Tasks;
using PodNoms.Api.Models;

namespace PodNoms.Api.Services.Processor {
    public interface IUrlProcessService {
        Task<bool> GetInformation (int entryId);
        Task<bool> GetInformation (PodcastEntry entry);
        Task<bool> DownloadAudio (int entryId);
    }
}