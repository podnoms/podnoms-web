using System.Threading.Tasks;

namespace PodNoms.Api.Services {
    public interface IMailSender {
        Task<bool> SendEmailAsync(string email, string subject, string message, string template = "email.html");
        Task<bool> SendEmailAsync(string email, string subject, dynamic viewModel, string template = "email.html");
    }
}
