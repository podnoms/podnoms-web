using System.Collections.Generic;
using System.Threading.Tasks;
using PodNoms.Api.Models;

namespace PodNoms.Api.Persistence {
    public interface IPlaylistRepository {
        Task<Playlist> GetAsync(int id);
        Task<IEnumerable<Playlist>> GetAllAsync();
        Task<Playlist> AddOrUpdateAsync(Playlist playlist);
    }
}