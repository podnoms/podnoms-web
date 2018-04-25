using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using PodNoms.Api.Persistence;
using PodNoms.Api.Services.Auth;
using PodNoms.Api.Utils.Extensions;

namespace PodNoms.Api.Services.Auth {
    public class PodNomsUserManager : UserManager<ApplicationUser> {
        private readonly PodnomsDbContext _context;

        public PodNomsUserManager(IUserStore<ApplicationUser> store, IOptions<IdentityOptions> optionsAccessor,
        IPasswordHasher<ApplicationUser> passwordHasher, IEnumerable<IUserValidator<ApplicationUser>> userValidators,
        IEnumerable<IPasswordValidator<ApplicationUser>> passwordValidators, ILookupNormalizer keyNormalizer,
        IdentityErrorDescriber errors, IServiceProvider services, ILogger<UserManager<ApplicationUser>> logger) :
            base(store, optionsAccessor, passwordHasher, userValidators, passwordValidators, keyNormalizer, errors, services, logger) {
        }
        public override Task<IdentityResult> CreateAsync(ApplicationUser user) {
            _slugify(user);
            return base.CreateAsync(user);
        }
        public override Task<IdentityResult> UpdateAsync(ApplicationUser user) {
            _slugify(user);
            return base.UpdateAsync(user);
        }

        private void _slugify(ApplicationUser user) {
            if (string.IsNullOrEmpty(user.Slug)) {
                var name = $"{user.FirstName} {user.LastName}";
                var c = name ?? user.Email?.Split('@')[0] ?? string.Empty;
                if (!string.IsNullOrEmpty(c)) {
                    user.Slug = c.Slugify(
                        from u in Users select u.Slug);
                }
            }
        }
    }
}