using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace PodNoms.Api.Services.Storage
{
    public abstract class CachedFormFileStorage 
    {
        public static async Task<string> CacheItem(IFormFile file)
        {
            var path = Path.GetTempPath();
            var fileName = Path.Combine(path, System.Guid.NewGuid().ToString() + Path.GetExtension(file.FileName));
            using (var stream = new FileStream(fileName, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }
            return fileName;
        }
    }
}