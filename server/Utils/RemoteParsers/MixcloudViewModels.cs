using System;
using System.Collections.Generic;

namespace PodNoms.Api.Utils.RemoteParsers {


    public class Paging {
        public string previous { get; set; }
        public string next { get; set; }
    }

    public class Pictures {
        public string medium { get; set; }
        public string extra_large { get; set; }
        public string large { get; set; }
        public string medium_mobile { get; set; }
        public string small { get; set; }
        public string thumbnail { get; set; }
    }

    public class From {
        public string url { get; set; }
        public string username { get; set; }
        public string name { get; set; }
        public string key { get; set; }
        public Pictures pictures { get; set; }
    }

    public class Tag {
        public string url { get; set; }
        public string name { get; set; }
        public string key { get; set; }
    }

    public class User {
        public string url { get; set; }
        public string username { get; set; }
        public string name { get; set; }
        public string key { get; set; }
    }

    public class Cloudcast {
        public IList<Tag> tags { get; set; }
        public int play_count { get; set; }
        public User user { get; set; }
        public string key { get; set; }
        public DateTime created_time { get; set; }
        public int audio_length { get; set; }
        public string slug { get; set; }
        public int favorite_count { get; set; }
        public int listener_count { get; set; }
        public string name { get; set; }
        public string url { get; set; }
        public int repost_count { get; set; }
        public DateTime updated_time { get; set; }
        public int comment_count { get; set; }
    }

    public class Datum {
        public From from { get; set; }
        public string title { get; set; }
        public string url { get; set; }
        public string key { get; set; }
        public DateTime created_time { get; set; }
        public IList<Cloudcast> cloudcasts { get; set; }
        public string type { get; set; }
    }

    public class MixcloudResult {
        public Paging paging { get; set; }
        public IList<Datum> data { get; set; }
        public string name { get; set; }
    }

}