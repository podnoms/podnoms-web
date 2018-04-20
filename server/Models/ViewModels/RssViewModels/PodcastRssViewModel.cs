using System.Collections.Generic;

namespace PodNoms.Api.Models.ViewModels.RssViewModels
{
    public class PodcastEnclosureViewModel
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string Author { get; set; }
        public string Link { get; set; }
        public string Image { get; set; }
        public string PublishDate { get; set; }
        public string Language { get; set; }
        public string Copyright { get; set; }
        public List<PodcastEnclosureItemViewModel> Items { get; set; }
    }
    public class PodcastEnclosureItemViewModel
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string Author { get; set; }
        public string UpdateDate { get; set; }
        public string AudioUrl { get; set; }
        public long AudioFileSize { get; set; }
    }
}