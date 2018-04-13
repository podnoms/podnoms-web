using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PodNoms.Api.Models;
using PodNoms.Api.Persistence;
using PodNoms.Api.Utils;
using PodNoms.Api.Utils.Extensions;

namespace PodNoms.Api.Persistence {
    public class UserRepository : IUserRepository {
        private readonly PodnomsDbContext _context;

        public UserRepository(PodnomsDbContext context) {
            _context = context;
        }

        public User Get(int id) {
            return _context.Users.FirstOrDefault(u => u.Id == id);
        }

        public User Get(string email) {
            return _context.Users.FirstOrDefault(u => u.EmailAddress == email);
        }
        public async Task<User> GetAsync(string email) {
            return await _context.Users
                .Where(u => u.EmailAddress == email)
                .FirstOrDefaultAsync();     
        }
        public async Task<User> GetBySlugAsync(string slug) {
            var user = await _context.Users
                .Where(u => u.Slug == slug)
                .FirstOrDefaultAsync();

            return user;
        }

        public User AddOrUpdate(User user) {
            if (user.Id != 0) {
                _context.Users.Attach(user);
            } else {
                _context.Users.Add(user);

            }
            return user;
        }

        public User UpdateRegistration(string email, string name, string sid, string providerId, string profileImage,
                                             string refreshToken) {
            var user = _context.Users.FirstOrDefault(u => u.EmailAddress == email);

            if (user == null) {
                user = new User();
                user.EmailAddress = email;
            }
            user.FullName = string.IsNullOrEmpty(user.FullName) ? name : user.FullName;
            if (string.IsNullOrEmpty(user.Slug)) {
                var c = user.FullName ?? email?.Split('@')[0] ?? string.Empty;
                if (!string.IsNullOrEmpty(c)) {
                    user.Slug = c.Slugify(
                        from u in _context.Users select u.Slug);
                }
            }
            if (string.IsNullOrEmpty(user.Uid)) {
                user.Uid = System.Guid.NewGuid().ToString();
            }
            if (!string.IsNullOrEmpty(refreshToken)) {
                user.RefreshToken = refreshToken;
            }
            user.Sid = sid;
            user.ProfileImage = profileImage;

            if (string.IsNullOrEmpty(user.ApiKey))
                UpdateApiKey(user);

            AddOrUpdate(user);
            return user;
        }

        public string UpdateApiKey(User user) {
            var newKey = "";
            if (user != null) {
                do {
                    newKey = Randomisers.RandomString(16);
                } while (_context.Users.FirstOrDefault(u => u.ApiKey == newKey) != null);
            }
            user.ApiKey = newKey;
            return newKey;
        }
    }
}