using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Google.Apis.Services;
using Google.Apis.YouTube.v3;
using Microsoft.Extensions.Options;
using PodNoms.Api.Models;

namespace PodNoms.Api.Utils.RemoteParsers {
    public partial class YouTubeParser {
        const string URL_REGEX = @"^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+";
        private readonly AppSettings _settings;
        private YouTubeService youtube;
        public YouTubeParser(IOptions<AppSettings> options) {
            this._settings = options.Value;
            this.youtube = _getYouTubeService();
        }
        private YouTubeService _getYouTubeService() {
            return new YouTubeService(new BaseClientService.Initializer() {
                ApiKey = _settings.GoogleApiKey,
                ApplicationName = this.GetType().ToString()
            });
        }

        public bool ValidateUrl(string url) {
            var regex = new Regex(URL_REGEX);
            var result = regex.Match(url);
            return result.Success;
        }
        public async Task<List<ParsedItemResult>> GetPlaylistEntriesForId(string id, int nCount = 10) {
            var playlistRequest = youtube.PlaylistItems.List("contentDetails");
            playlistRequest.PlaylistId = id;
            playlistRequest.MaxResults = nCount;
            var plists = await playlistRequest.ExecuteAsync();
            return plists.Items
                .Select(p => new ParsedItemResult {
                    Id = p.ContentDetails.VideoId,
                    VideoType = "youtube",
                    UploadDate = p.ContentDetails.VideoPublishedAt
                }).ToList();
        }
        public async Task<List<ParsedItemResult>> GetPlaylistEntriesForChannelName(string channelName, string searchType, int nCount = 10) {

            var request = youtube.Channels.List("contentDetails");
            if (searchType.Equals("id"))
                request.Id = channelName;
            else
                request.ForUsername = channelName;
            request.MaxResults = 1;
            var resp = await request.ExecuteAsync();
            if (resp.Items.Count == 1) {
                var uploadListId = resp.Items[0].ContentDetails.RelatedPlaylists.Uploads;
                if (!string.IsNullOrEmpty(uploadListId)) {
                    return await GetPlaylistEntriesForId(uploadListId, nCount);
                }
            }
            return null;
        }
    }
}