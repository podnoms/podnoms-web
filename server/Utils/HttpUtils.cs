using System.Net.Http;
using System.Threading.Tasks;

namespace PodNoms.Api.Utils {
    public class HttpUtils {
        public static async Task<string> DownloadFile(string url, string file = "") {
            if (string.IsNullOrEmpty(file))
                file = System.IO.Path.GetTempFileName();

            using (var client = new HttpClient()) {
                using (var response = await client.GetAsync(url)) {
                    using (var content = response.Content) {
                        byte[] result = await content.ReadAsByteArrayAsync();
                        System.IO.File.WriteAllBytes(file, result);
                    }
                }
            }
            return file;
        }
    }
}