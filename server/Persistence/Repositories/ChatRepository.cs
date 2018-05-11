using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PodNoms.Api.Models;

namespace PodNoms.Api.Persistence {
    public interface IChatRepository : IRepository<ChatMessage> {
        Task<IEnumerable<ChatMessage>> GetSentChats(string fromUserId);
        Task<IEnumerable<ChatMessage>> GetReceivedChats(string fromUserId);
        Task<IEnumerable<ChatMessage>> GetChats(string fromUserId, string toUserId);
        Task<IEnumerable<ChatMessage>> GetAllChats(string userId);
    }
    public class ChatRepository : GenericRepository<ChatMessage>, IChatRepository {
        public ChatRepository(PodNomsDbContext context) : base(context) {

        }

        public async Task<IEnumerable<ChatMessage>> GetAllChats(string userId) {
            var chats = await GetAll()
                .Where(c => c.FromUser.Id == userId || c.ToUser.Id == userId)
                .Include(c => c.FromUser)
                .Include(c => c.ToUser)
                .ToListAsync();

            return chats;
        }
        public async Task<IEnumerable<ChatMessage>> GetChats(string fromUserId, string toUserId) {
            var chats = await GetAll()
                .Where(c => c.FromUser.Id == fromUserId && c.ToUser.Id == toUserId)
                .Include(c => c.FromUser)
                .Include(c => c.ToUser)
                .ToListAsync();

            return chats;
        }

        public async Task<IEnumerable<ChatMessage>> GetReceivedChats(string toUserId) {
            var chats = await GetAll()
                .Where(c => c.ToUser.Id == toUserId)
                .Include(c => c.FromUser)
                .Include(c => c.ToUser)
                .ToListAsync();

            return chats;
        }

        public async Task<IEnumerable<ChatMessage>> GetSentChats(string fromUserId) {
            var chats = await GetAll()
                .Where(c => c.FromUser.Id == fromUserId)
                .Include(c => c.FromUser)
                .Include(c => c.ToUser)
                .ToListAsync();

            return chats;
        }
    }
}