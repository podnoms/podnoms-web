using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using PodNoms.Api.Models.Settings;
using PodNoms.Api.Models.ViewModels;
using Slack.Webhooks;

namespace PodNoms.Api.Services.Slack {
    public class SlackSupportClient {
        private readonly ChatSettings _chatSettings;

        public SlackSupportClient(IOptions<ChatSettings> options) {
            this._chatSettings = options.Value;
        }

        public async Task<bool> NotifyUser(ChatViewModel message) {
            var slackClient = new SlackClient(_chatSettings.SlackWebhookUrl);
            var slackMessage = new SlackMessage {
                Channel = _chatSettings.SlackChannel,
                Text = message.Message,
                IconEmoji = Emoji.HearNoEvil,
                Username = message.FromUserName
            };
            return await slackClient.PostAsync(slackMessage);
        }
    }
}