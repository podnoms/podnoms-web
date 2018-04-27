using System.Collections.Generic;
using System.Collections.ObjectModel;
using Microsoft.Extensions.Options;
using PodNoms.Api.Services.Auth;

namespace PodNoms.Api.Models {
    public class Podcast : BaseModel {
        public int Id { get; set; }
        public string Uid { get; set; }
        public ApplicationUser AppUser { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Slug { get; set; }
        public string ImageUrl { get; set; }
        public List<PodcastEntry> PodcastEntries { get; set; }
        public Podcast() {
            PodcastEntries = new List<PodcastEntry>();
        }

        public string GetImageUrl(string cdnUrl, string containerName) {
            return $"{cdnUrl}{containerName}/{this.ImageUrl}";
        }
        public string GetThumnnailUrl(string cdnUrl, string containerName) {
            return $"{cdnUrl}{containerName}/{this.Uid}-32x32.png";
        }
    }
}