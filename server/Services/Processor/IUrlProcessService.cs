using System.Threading.Tasks;

namespace PodNoms.Api.Services.Processor {
    public interface IUrlProcessService {
        Task<bool> CheckUrlValid (string url);
        Task<bool> GetInformation (int entryId);
        Task<bool> DownloadAudio (int entryId);
    }
}