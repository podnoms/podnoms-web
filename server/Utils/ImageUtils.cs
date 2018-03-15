using System.Threading.Tasks;

namespace PodNoms.Api.Utils
{
    public class ImageUtils
    {
        public static async Task<string> GetRemoteImageAsBase64(string url)
        {

            var file = await HttpUtils.DownloadFile(url);
            return await ImageAsBase64(file);
        }
        public static async Task<string> ImageAsBase64(string file)
        {
            if (System.IO.File.Exists(file))
            {
                byte[] data = await System.IO.File.ReadAllBytesAsync(file);
                string base64 = System.Convert.ToBase64String(data);
                return $"data:image/jpeg;base64,{base64}";
            }
            return string.Empty;
        }
    }
}