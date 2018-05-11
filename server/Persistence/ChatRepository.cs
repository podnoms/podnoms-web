using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PodNoms.Api.Models;

namespace PodNoms.Api.Persistence {
    public class ChatRepository : IChatRepository {
        private readonly PodNomsDbContext _context;

        public ChatRepository(PodNomsDbContext context) {
            this._context = context;
        }
        public async Task<ChatMessage> AddOrUpdateChat(ChatMessage chat) {
            if (chat.Id != 0) {
                // _context.Entry(entry).State = EntityState.Modified
                _context.ChatMessages.Attach(chat);
                _context.Entry(chat).State = EntityState.Modified;
            } else {
                await _context.ChatMessages.AddAsync(chat);
            }
            return chat;
        }

        public async Task<IEnumerable<ChatMessage>> GetAllChats(string userId) {
            var chats = await _context.ChatMessages
                .Where(c => c.FromUser.Id == userId || c.ToUser.Id == userId)
                .Include(c => c.FromUser)
                .Include(c => c.ToUser)
                .ToListAsync();

            return chats;
        }
        public async Task<IEnumerable<ChatMessage>> GetChats(string fromUserId, string toUserId) {
            var chats = await _context.ChatMessages
                .Where(c => c.FromUser.Id == fromUserId && c.ToUser.Id == toUserId)
                .Include(c => c.FromUser)
                .Include(c => c.ToUser)
                .ToListAsync();

            return chats;
        }

        public async Task<IEnumerable<ChatMessage>> GetReceivedChats(string toUserId) {
            var chats = await _context.ChatMessages
                .Where(c => c.ToUser.Id == toUserId)
                .Include(c => c.FromUser)
                .Include(c => c.ToUser)
                .ToListAsync();

            return chats;
        }

        public async Task<IEnumerable<ChatMessage>> GetSentChats(string fromUserId) {
            var chats = await _context.ChatMessages
                .Where(c => c.FromUser.Id == fromUserId)
                .Include(c => c.FromUser)
                .Include(c => c.ToUser)
                .ToListAsync();

            return chats;
        }
    }
}