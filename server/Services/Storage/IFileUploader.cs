using System;
using System.Threading.Tasks;

namespace PodNoms.Api.Services.Storage
{
    public interface IFileUploader
    {
        Task<string> UploadFile(string sourceFile, string containerName, string destinationFile, Action<int, long> progressCallback);
    }
}