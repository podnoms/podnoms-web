using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace PodNoms.Api.Models.ViewModels {
    public class PodcastViewModel {
        public int Id { get; set; }
        public string Uid { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Slug { get; set; }
        public string ImageUrl { get; set; }
        public string ThumbnailUrl { get; set; }
        public string RssUrl { get; set; }
        // public ICollection<PodcastEntryViewModel> PodcastEntries { get; set; }
    }
}