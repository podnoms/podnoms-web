using System.Collections.Generic;
using System.Threading.Tasks;
using PodNoms.Api.Models;

namespace PodNoms.Api.Persistence {
    public interface IChatRepository {
        Task<IEnumerable<ChatMessage>> GetSentChats(string fromUserId);
        Task<IEnumerable<ChatMessage>> GetReceivedChats(string fromUserId);
        Task<IEnumerable<ChatMessage>> GetChats(string fromUserId, string toUserId);
        Task<IEnumerable<ChatMessage>> AddOrUpdateChat(ChatMessage message);
    }

}