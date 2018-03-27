namespace PodNoms.Api.Services.Push {
    public class PushNotificationServiceOptions {

        public string Subject { get; set; }
        public string PushUrl { get; set; }
        public string ClickUrl { get; set; }
        public string ImageUrl { get; set; }
        public string PublicKey { get; set; }
        public string PrivateKey { get; set; }
    }
}