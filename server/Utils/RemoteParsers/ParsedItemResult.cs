using System;

namespace PodNoms.Api.Utils.RemoteParsers {
    public class ParsedItemResult {
        public string Id { get; set; }
        public string VideoType { get; set; }
        public DateTime? UploadDate { get; set; }
    }
}