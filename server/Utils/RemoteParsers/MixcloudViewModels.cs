using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace PodNoms.Api.Utils.RemoteParsers {
    public partial class Welcome {
        [JsonProperty("paging")]
        public Paging Paging { get; set; }

        [JsonProperty("data")]
        public Datum[] Data { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }
    }

    public partial class Datum {
        [JsonProperty("tags")]
        public Tag[] Tags { get; set; }

        [JsonProperty("play_count")]
        public long PlayCount { get; set; }

        [JsonProperty("user")]
        public User User { get; set; }

        [JsonProperty("key")]
        public string Key { get; set; }

        [JsonProperty("created_time")]
        public DateTimeOffset CreatedTime { get; set; }

        [JsonProperty("audio_length")]
        public long AudioLength { get; set; }

        [JsonProperty("slug")]
        public string Slug { get; set; }

        [JsonProperty("favorite_count")]
        public long FavoriteCount { get; set; }

        [JsonProperty("listener_count")]
        public long ListenerCount { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("url")]
        public string Url { get; set; }

        [JsonProperty("pictures")]
        public Pictures Pictures { get; set; }

        [JsonProperty("repost_count")]
        public long RepostCount { get; set; }

        [JsonProperty("updated_time")]
        public DateTimeOffset UpdatedTime { get; set; }

        [JsonProperty("comment_count")]
        public long CommentCount { get; set; }
    }

    public partial class Pictures {
        [JsonProperty("medium")]
        public string Medium { get; set; }

        [JsonProperty("768wx768h", NullValueHandling = NullValueHandling.Ignore)]
        public string The768Wx768H { get; set; }

        [JsonProperty("320wx320h")]
        public string The320Wx320H { get; set; }

        [JsonProperty("extra_large")]
        public string ExtraLarge { get; set; }

        [JsonProperty("large")]
        public string Large { get; set; }

        [JsonProperty("640wx640h")]
        public string The640Wx640H { get; set; }

        [JsonProperty("medium_mobile")]
        public string MediumMobile { get; set; }

        [JsonProperty("small")]
        public string Small { get; set; }

        [JsonProperty("1024wx1024h", NullValueHandling = NullValueHandling.Ignore)]
        public string The1024Wx1024H { get; set; }

        [JsonProperty("thumbnail")]
        public string Thumbnail { get; set; }
    }

    public partial class Tag {
        [JsonProperty("url")]
        public string Url { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("key")]
        public string Key { get; set; }
    }

    public partial class User {
        [JsonProperty("url")]
        public string Url { get; set; }

        [JsonProperty("username")]
        public string Username { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("key")]
        public string Key { get; set; }

        [JsonProperty("pictures")]
        public Pictures Pictures { get; set; }
    }

    public partial class Paging {
        [JsonProperty("previous")]
        public string Previous { get; set; }

        [JsonProperty("next")]
        public string Next { get; set; }
    }
}