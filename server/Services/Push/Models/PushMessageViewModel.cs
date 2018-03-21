using Lib.Net.Http.WebPush;

namespace PodNoms.Api.Services.Push.Models {
    public class PushMessageViewModel {
        public string Topic { get; set; }

        public string Notification { get; set; }

        public PushMessageUrgency Urgency { get; set; } = PushMessageUrgency.Normal;
    }
}