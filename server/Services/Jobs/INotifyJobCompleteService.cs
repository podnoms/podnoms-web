using System.Threading.Tasks;

namespace PodNoms.Api.Services.Jobs {
    public interface INotifyJobCompleteService {
        Task NotifyUser(string userId, string title, string body, string image);
    }
}