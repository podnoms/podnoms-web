using System.Threading.Tasks;
using PodNoms.Api.Models;

namespace PodNoms.Api.Persistence {
    public interface IUserRepository {
        User Get(int id);
        User Get(string email);
        Task<User> GetAsync(string id);
        Task<User> GetBySlugAsync(string slug);
        User UpdateRegistration(string email, string name, string sid, string providerId, string profileImage, string refreshToken);
        string UpdateApiKey(User user);
        User AddOrUpdate(User user);
    }
}