using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using PodNoms.Api.Models;


namespace PodNoms.Api.Persistence {
    public interface IEntryRepository : IRepository<PodcastEntry> {
        Task<IEnumerable<PodcastEntry>> GetAllForSlugAsync(string podcastSlug);
        Task<IEnumerable<PodcastEntry>> GetAllForUserAsync(string userId);
        Task<PodcastEntry> GetByUidAsync(string uid);
        Task LoadPodcastAsync(PodcastEntry entry);
    }
    public class EntryRepository : GenericRepository<PodcastEntry>, IEntryRepository {
        public EntryRepository(PodNomsDbContext context, ILogger<EntryRepository> logger) : base(context, logger) {
        }

        public new async Task<PodcastEntry> GetAsync(int id) {
            var ret = await GetAll()
                .Where(p => p.Id == id)
                .Include(p => p.Podcast)
                .Include(p => p.Podcast.AppUser)
                .FirstOrDefaultAsync();
            return ret;
        }
        public async Task<IEnumerable<PodcastEntry>> GetAllForSlugAsync(string podcastSlug) {
            var entries = await GetAll()
                .Where(e => e.Podcast.Slug == podcastSlug)
                .Include(e => e.Podcast)
                .ToListAsync();
            return entries;
        }
        public async Task<IEnumerable<PodcastEntry>> GetAllForUserAsync(string userId) {
            var entries = await GetAll()
                .Where(e => e.Podcast.AppUser.Id == userId)
                .Include(e => e.Podcast)
                .ToListAsync();
            return entries;
        }

        public async Task<PodcastEntry> GetByUidAsync(string uid) {
            var entry = await GetAll()
                    .Include(e => e.Podcast)
                    .SingleOrDefaultAsync(e => e.NewId.ToString().Equals(uid))
;
            return entry;
        }

        public async Task LoadPodcastAsync(PodcastEntry entry) {
            await GetContext().Entry(entry)
                   .Reference(e => e.Podcast)
                   .LoadAsync();
        }
    }
}