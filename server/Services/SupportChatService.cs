using System.Threading.Tasks;
using Lib.Net.Http.WebPush;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using PodNoms.Api.Models.Settings;
using PodNoms.Api.Models.ViewModels;
using PodNoms.Api.Services.Auth;
using PodNoms.Api.Services.Hubs;
using PodNoms.Api.Services.Push;
using PodNoms.Api.Services.Slack;
using WebPush = Lib.Net.Http.WebPush;

namespace PodNoms.Api.Services {
    public class SupportChatService : ISupportChatService {
        private readonly ChatSettings _chatSettings;
        private readonly IPushNotificationService _notificationService;
        private readonly HubLifetimeManager<ChatHub> _chatHub;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IPushSubscriptionStore _subscriptionStore;
        private readonly SlackSupportClient _slackSupport;
        public SupportChatService(UserManager<ApplicationUser> userManager, IOptions<ChatSettings> chatSettings,
                         IPushSubscriptionStore subscriptionStore, IPushNotificationService notificationService,
                         HubLifetimeManager<ChatHub> chatHub, SlackSupportClient slackSupport) {
            this._chatSettings = chatSettings.Value;
            this._notificationService = notificationService;
            this._chatHub = chatHub;
            this._userManager = userManager;
            this._subscriptionStore = subscriptionStore;
            this._slackSupport = slackSupport;

        }
        public async Task<bool> InitiateSupportRequest(string fromUser, ChatViewModel message) {
            if (!string.IsNullOrEmpty(_chatSettings.CurrentChatUser)) {
                var user = await _userManager.FindByEmailAsync(_chatSettings.CurrentChatUser);
                if (!string.IsNullOrEmpty(user?.Id)) {
                    message.ToUserId = user.Id;
                    message.ToUserName = user.FullName;
                    //send firebase message to notify via web worker
                    WebPush.PushMessage pushMessage = new WebPush.PushMessage(message.Message) {
                        Topic = "New support chat message",
                        Urgency = PushMessageUrgency.Normal
                    };
                    await _subscriptionStore.ForEachSubscriptionAsync(user.Id, (WebPush.PushSubscription subscription) => {
                        _notificationService.SendNotificationAsync(subscription, pushMessage);
                    });

                    //send SignalR message to notify in chat.component
                    await _chatHub.SendUserAsync(user.Email, "SendMessage", new object[] { message });

                    //send slack message
                    var slackResult = await _slackSupport.NotifyUser(message);
                    return true;
                }
            }
            return false;
        }
    }
}