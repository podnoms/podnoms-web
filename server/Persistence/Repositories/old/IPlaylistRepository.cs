using System.Collections.Generic;
using System.Threading.Tasks;
using PodNoms.Api.Models;

namespace PodNoms.Api.Persistence.Old {
    public interface IPlaylistRepository {
        Task<Playlist> GetAsync(int id);
        Task<IEnumerable<Playlist>> GetAllAsync();
        Task<Playlist> AddOrUpdateAsync(Playlist playlist);
        Task<ParsedPlaylistItem> GetParsedItem(string itemId, int playlistId);
        Task<List<ParsedPlaylistItem>> GetUnprocessedItems();
    }
}