using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using PodNoms.Api.Models;
using System.Net;

namespace PodNoms.Api.Services {
    public class MailgunSender : IMailSender {
        private readonly EmailSettings _emailSettings;
        private readonly ILogger _logger;
        public MailgunSender(IOptions<EmailSettings> emailSettings, ILogger<MailgunSender> logger){
            _emailSettings = emailSettings.Value;
            _logger = logger;
        }

        public async Task<bool> SendEmail(string email, string subject, string message){
            using (var client = new HttpClient { BaseAddress = new Uri(_emailSettings.ApiBaseUri) }) {
                client.DefaultRequestHeaders.Authorization =
                    new AuthenticationHeaderValue("Basic",
                            Convert.ToBase64String(Encoding.ASCII.GetBytes(_emailSettings.ApiKey)));

                _logger.LogInformation($"From: {_emailSettings.From}\nTo: {email}\nApi key: {_emailSettings.ApiKey}");

                var content = new FormUrlEncodedContent(new[]
                        {
                        new KeyValuePair<string, string>("from", _emailSettings.From),
                        new KeyValuePair<string, string>("to", email),
                        new KeyValuePair<string, string>("subject", subject),
                        new KeyValuePair<string, string>("html", message)
                        });

                var result = await client.PostAsync(_emailSettings.RequestUri, content).ConfigureAwait(false);
                if (result.StatusCode == HttpStatusCode.OK)
                    return true;

                _logger.LogError($"Error {result.StatusCode} sending mail\n{result.ReasonPhrase}");
                return false;
            }
        }
    }
}
