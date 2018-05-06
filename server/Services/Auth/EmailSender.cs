using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.UI.Services;
using PodNoms.Api.Services;

namespace PodNoms.Api.Services.Auth {
    public class EmailSender : IEmailSender {
        private readonly IMailSender _mailSender;

        public EmailSender(IMailSender mailSender) {
            this._mailSender = mailSender;
        }

        public async Task SendEmailAsync(string email, string subject, string htmlMessage) {
            await this._mailSender.SendEmail(email, subject, htmlMessage);
        }
    }
}