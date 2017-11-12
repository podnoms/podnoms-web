using System.IO;
using System.Linq;

namespace PodNoms.Api.Models
{
    public class ImageFileStorageSettings : FileStorageSettings
    {
    }

    public class AudioFileStorageSettings : FileStorageSettings
    {
    }

    public class FileStorageSettings
    {
        public string ContainerName { get; set; }
        public long MaxUploadFileSize { get; set; }
        public string[] AllowedFileTypes { get; set; }

        public bool IsSupported(string fileName)
        {
            return AllowedFileTypes.Any(s => s == Path.GetExtension(fileName).ToLower());
        }
    }
    public class ApplicationsSettings
    {
        public string Downloader { get; set; }
    }
}