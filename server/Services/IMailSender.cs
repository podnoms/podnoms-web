using System.Threading.Tasks;

namespace PodNoms.Api.Services {
    public interface IMailSender {
        Task<bool> SendEmail(string email, string subject, string message);
    }
}
