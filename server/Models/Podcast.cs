using System.Collections.Generic;
using System.Collections.ObjectModel;
using Microsoft.Extensions.Options;
using PodNoms.Api.Services.Auth;

namespace PodNoms.Api.Models {
    public class Podcast : BaseModel {
        public ApplicationUser AppUser { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Slug { get; set; }
        public string TemporaryImageUrl { get; set; }
        public List<PodcastEntry> PodcastEntries { get; set; }
        public Podcast() {
            PodcastEntries = new List<PodcastEntry>();
        }

        public string GetImageUrl(string cdnUrl, string containerName) {
            return string.IsNullOrEmpty(TemporaryImageUrl) ? $"{cdnUrl}{containerName}/{this.ExposedUid}.png" :
                $"{cdnUrl}static/images/{TemporaryImageUrl}";
        }
        public string GetThumbnailUrl(string cdnUrl, string containerName) {
            return string.IsNullOrEmpty(TemporaryImageUrl) ? $"{cdnUrl}{containerName}/{this.ExposedUid}-32x32.png" :
                $"{cdnUrl}static/images/{TemporaryImageUrl}";
        }
    }
}