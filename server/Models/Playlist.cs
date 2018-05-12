using System.Collections.Generic;

namespace PodNoms.Api.Models {
    public class Playlist : BaseEntity {
        //TODO: Update this to use concrete model
        public int PodcastId { get; set; }
        public string SourceUrl { get; set; }
        public Podcast Podcast { get; set; }
        public List<PodcastEntry> PodcastEntries { get; set; }
        public List<ParsedPlaylistItem> ParsedPlaylistItems { get; set; }
        public Playlist() {
            ParsedPlaylistItems = new List<ParsedPlaylistItem>();
        }
    }
    public class ParsedPlaylistItem : BaseEntity {
        public string VideoId { get; set; }
        public string VideoType { get; set; }
        public bool IsProcessed { get; set; }
        public int PlaylistId { get; set; }
        public Playlist Playlist { get; set; }
    }
}