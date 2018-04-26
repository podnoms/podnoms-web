using System.Collections.Generic;
using System.Threading.Tasks;
using PodNoms.Api.Models;

namespace PodNoms.Api.Persistence {
    public interface IEntryRepository {
        Task<PodcastEntry> GetAsync(int id);
        Task<PodcastEntry> GetByUidAsync(string uid);
        Task<IEnumerable<PodcastEntry>> GetAllAsync(int podcastId);
        Task<IEnumerable<PodcastEntry>> GetAllAsync(string podcastSlug);
        Task<IEnumerable<PodcastEntry>> GetAllForUserAsync(string userId);
        Task<PodcastEntry> AddOrUpdateAsync(PodcastEntry entry);
        Task DeleteAsync(int id);
    }
}