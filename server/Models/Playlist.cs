using System.Collections.Generic;

namespace PodNoms.Api.Models {
    public class Playlist : BaseModel {
        public int Id { get; set; }
        public int PodcastId { get; set; }
        public string SourceUrl { get; set; }
        public Podcast Podcast { get; set; }
        public List<PodcastEntry> PodcastEntries { get; set; }
    }
}