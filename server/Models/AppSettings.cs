namespace PodNoms.Api.Models {
    public class AppSettings {
        public string Version { get; set; }
        public string RssUrl { get; set; }
    }

    public class StorageSettings {
        public string ConnectionString { get; set; }
        public string CdnUrl { get; set; }

    }
}