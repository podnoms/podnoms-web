using System.Collections.Generic;
using System.Net.Http;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System.Text.RegularExpressions;

namespace PodNoms.Api.Utils.RemoteParsers {
    public class MixcloudParser {
        const string URL_REGEX = @"^(http(s)?:\/\/)?((w){3}.)?mixcloud?(\.com)?\/.+";

        private readonly IHttpClientFactory _httpClientFactory;

        public MixcloudParser(IHttpClientFactory httpClientFactory) {
            this._httpClientFactory = httpClientFactory;
        }
        public static bool ValidateUrl(string url) {
            var regex = new Regex(URL_REGEX);
            var result = regex.Match(url);
            return result.Success;
        }
        public async Task<List<ParsedItemResult>> GetEntries(string identifier) {
            var client = _httpClientFactory.CreateClient("mixcloud");
            var result = await client.GetAsync(identifier);
            if (result.IsSuccessStatusCode) {
                var typed = JsonConvert.DeserializeObject<MixcloudResult>(await result.Content.ReadAsStringAsync());
                return typed.data[0].cloudcasts.Select(c => new ParsedItemResult {
                    Id = c.key,
                    VideoType = "mixcloud",
                    UploadDate = c.updated_time
                }).ToList();
            }
            return null;
        }
    }
}