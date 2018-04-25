using System.Collections.Generic;
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
            return await _context.Playlists.ToListAsync();
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
    }
}