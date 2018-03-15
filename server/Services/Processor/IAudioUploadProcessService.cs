using System.Threading.Tasks;

namespace PodNoms.Api.Services.Processor
{
    public interface IAudioUploadProcessService
    {
        Task<bool> UploadAudio(int entryId, string localFile);
    }
}