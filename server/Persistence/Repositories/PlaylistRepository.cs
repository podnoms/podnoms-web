using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using PodNoms.Api.Models;

namespace PodNoms.Api.Persistence {
    public interface IPlaylistRepository : IRepository<Playlist> {
        Task<ParsedPlaylistItem> GetParsedItem(string itemId, int playlistId);
        Task<List<ParsedPlaylistItem>> GetUnprocessedItems();
    }
    public class PlaylistRepository : GenericRepository<Playlist>, IPlaylistRepository {
        public PlaylistRepository(PodNomsDbContext context, ILogger<PlaylistRepository> logger) : base(context, logger) {
        }
        public new async Task<Playlist> GetAsync(int id) {
            return await GetContext().Playlists
                .Include(i => i.ParsedPlaylistItems)
                .SingleOrDefaultAsync(i => i.Id == id);
        }
        public async Task<ParsedPlaylistItem> GetParsedItem(string itemId, int playlistId) {
            return await GetContext().ParsedPlaylistItems
                .Include(i => i.Playlist)
                .Include(i => i.Playlist.Podcast)
                .Include(i => i.Playlist.Podcast.AppUser)
                .SingleOrDefaultAsync(i => i.VideoId == itemId && i.Playlist.Id == playlistId);
        }
        public async Task<List<ParsedPlaylistItem>> GetUnprocessedItems() {
            return await GetContext().ParsedPlaylistItems
                .Where(p => p.IsProcessed == false)
                .Include(i => i.Playlist)
                .Include(i => i.Playlist.Podcast)
                .Include(i => i.Playlist.Podcast.AppUser)
                .ToListAsync();
        }
    }
}