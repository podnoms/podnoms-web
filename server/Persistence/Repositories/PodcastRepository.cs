using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using PodNoms.Api.Models;

namespace PodNoms.Api.Persistence {
    public interface IPodcastRepository : IRepository<Podcast> {
        Task<Podcast> GetAsync(string id, string slug);
        Task<IEnumerable<Podcast>> GetAllForUserAsync(string userId);
    }
    public class PodcastRepository : GenericRepository<Podcast>, IPodcastRepository {
        public PodcastRepository(PodNomsDbContext context, ILogger<PodcastRepository> logger) : base(context, logger) {
        }
        public async Task<Podcast> GetAsync(string id, string slug) {
            var ret = await GetAll()
                .Where(p => p.Slug == slug && p.AppUser.Id == id)
                .Include(p => p.PodcastEntries)
                .Include(p => p.AppUser)
                .FirstOrDefaultAsync();
            return ret;
        }

        public async Task<IEnumerable<Podcast>> GetAllForUserAsync(string userId) {
            var ret = GetAll()
                .Where(u => u.AppUser.Id == userId)
                .Include(p => p.AppUser)
                .OrderByDescending(p => p.Id);
            return await ret.ToListAsync();
        }

    }
}