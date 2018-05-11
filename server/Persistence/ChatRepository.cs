using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PodNoms.Api.Models;

namespace PodNoms.Api.Persistence {
    public class ChatRepository : IChatRepository {
        private readonly PodnomsDbContext _context;

        public ChatRepository(PodnomsDbContext context) {
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

        public Task<IEnumerable<ChatMessage>> GetChats(string fromUserId, string toUserId) {
            throw new System.NotImplementedException();
        }

        public Task<IEnumerable<ChatMessage>> GetReceivedChats(string fromUserId) {
            throw new System.NotImplementedException();
        }

        public Task<IEnumerable<ChatMessage>> GetSentChats(string fromUserId) {
            throw new System.NotImplementedException();
        }

        Task<IEnumerable<ChatMessage>> IChatRepository.AddOrUpdateChat(ChatMessage message) {
            throw new System.NotImplementedException();
        }
    }

}