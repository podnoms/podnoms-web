using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PodNoms.Api.Models;


namespace PodNoms.Api.Persistence {
    public interface IEntryRepository : IRepository<PodcastEntry> {
        Task<IEnumerable<PodcastEntry>> GetAllForSlugAsync(string podcastSlug);
        Task<IEnumerable<PodcastEntry>> GetAllForUserAsync(string userId);
        Task<PodcastEntry> GetByUidAsync(string uid);
    }
    public class EntryRepository : GenericRepository<PodcastEntry>, IEntryRepository {
        public EntryRepository(PodNomsDbContext context) : base(context) {
        }
        public async Task<IEnumerable<PodcastEntry>> GetAllForSlugAsync(string podcastSlug) {
            var entries = await GetAll()
                .Where(e => e.Podcast.Slug == podcastSlug)
                .ToListAsync();
            return entries;
        }
        public async Task<IEnumerable<PodcastEntry>> GetAllForUserAsync(string userId) {
            var entries = await GetAll()
                .Where(e => e.Podcast.AppUser.Id == userId)
                .ToListAsync();
            return entries;
        }

        public async Task<PodcastEntry> GetByUidAsync(string uid) {
            var entry = await GetAll()
                    .SingleOrDefaultAsync(e => e.Uid == uid);
            return entry;
        }
    }
}