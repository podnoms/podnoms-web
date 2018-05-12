using System.Threading.Tasks;
using PodNoms.Api.Models.ViewModels;

namespace PodNoms.Api.Services {
    public interface ISupportChatService {
        Task<bool> InitiateSupportRequest(string fromUser, ChatViewModel message);
    }
}
