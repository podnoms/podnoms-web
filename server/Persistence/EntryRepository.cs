using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PodNoms.Api.Models;

namespace PodNoms.Api.Persistence {
    public class EntryRepository : IEntryRepository {
        private readonly PodnomsDbContext _context;

        public EntryRepository(PodnomsDbContext context) {
            this._context = context;
        }
        public async Task<PodcastEntry> GetAsync(int id) {
            var entry = await _context.PodcastEntries
                .Include(e => e.Podcast)
                .Include(e => e.Podcast.AppUser)
                .SingleOrDefaultAsync(e => e.Id == id);
            return entry;
        }
        public async Task<PodcastEntry> GetByUidAsync(string uid) {
            var entry = await _context.PodcastEntries
                .SingleOrDefaultAsync(e => e.Uid == uid);
            return entry;
        }
        public async Task<IEnumerable<PodcastEntry>> GetAllAsync(int podcastId) {
            var entries = await _context.PodcastEntries
                .AsNoTracking()
                .Where(e => e.PodcastId == podcastId)
                .ToListAsync();
            return entries;
        }
        public async Task<IEnumerable<PodcastEntry>> GetAllAsync(string podcastSlug) {
            var entries = await _context.PodcastEntries
                .Where(e => e.Podcast.Slug == podcastSlug)
                .ToListAsync();
            return entries;
        }
        public async Task<IEnumerable<PodcastEntry>> GetAllForUserAsync(string userId) {
            var entries = await _context.PodcastEntries
                .Where(e => e.Podcast.AppUser.Id == userId)
                .Include(e => e.Podcast)
                .ToListAsync();
            return entries;
        }

        public async Task<PodcastEntry> AddOrUpdateAsync(PodcastEntry entry) {
            if (entry.Id != 0) {
                // _context.Entry(entry).State = EntityState.Modified
                _context.PodcastEntries.Attach(entry);
                _context.Entry(entry).State = EntityState.Modified;
            } else {
                if (string.IsNullOrEmpty(entry.Uid))
                    entry.Uid = System.Guid.NewGuid().ToString();
                await _context.PodcastEntries.AddAsync(entry);
            }
            return entry;
        }
        public async Task DeleteAsync(int id) {
            var entry = await GetAsync(id);
            _context.Remove(entry);
        }
    }
}