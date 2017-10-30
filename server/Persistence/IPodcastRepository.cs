using System.Collections.Generic;
using System.Threading.Tasks;
using PodNoms.Api.Models;

namespace PodNoms.Api.Persistence
{
    public interface IPodcastRepository
    {
        Task<Podcast> GetAsync(int id);
        Task<Podcast> GetAsync(string emailAddress, string slug);
        Task<IEnumerable<Podcast>> GetAllAsync(string emailAddress);
        Task<Podcast> AddOrUpdateAsync(Podcast item);
        Task<int> DeleteAsync(int id);
    }
}