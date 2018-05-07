using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PodNoms.Api.Models;

namespace PodNoms.Api.Persistence {
    public class PlaylistRepository : IPlaylistRepository {
        private readonly PodnomsDbContext _context;

        public PlaylistRepository(PodnomsDbContext context) {
            this._context = context;
        }
        public async Task<Playlist> GetAsync(int id) {
            var entry = await _context.Playlists
                .Include(e => e.Podcast)
                .Include(e => e.Podcast.AppUser)
                .SingleOrDefaultAsync(e => e.Id == id);
            return entry;
        }
        public async Task<IEnumerable<Playlist>> GetAllAsync() {
            return await _context.Playlists.Include(p => p.ParsedPlaylistItems).ToListAsync();
        }
        public async Task<Playlist> AddOrUpdateAsync(Playlist playlist) {
            if (playlist.Id != 0) {
                // _context.Entry(entry).State = EntityState.Modified
                _context.Playlists.Attach(playlist);
                _context.Entry(playlist).State = EntityState.Modified;
            } else {
                await _context.Playlists.AddAsync(playlist);
            }
            return playlist;
        }
        public async Task<ParsedPlaylistItem> GetParsedItem(string itemId, int playlistId) {
            return await _context.ParsedPlaylistItems
                .Include(i => i.Playlist)
                .Include(i => i.Playlist.Podcast)
                .Include(i => i.Playlist.Podcast.AppUser)
                .SingleOrDefaultAsync(i => i.VideoId == itemId && i.PlaylistId == playlistId);
        }
        public async Task<List<ParsedPlaylistItem>> GetUnprocessedItems() {
            return await _context.ParsedPlaylistItems
                .Where(p => p.IsProcessed == false)
                .Include(i => i.Playlist)
                .Include(i => i.Playlist.Podcast)
                .Include(i => i.Playlist.Podcast.AppUser)
                .ToListAsync();
        }
    }
}