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
using Microsoft.AspNetCore.Mvc;
using PodNoms.Api.Services.Gravatar;
using PodNoms.Api.Models;
using PodNoms.Api.Utils;

namespace PodNoms.Api.Services.Auth {
    public class PodNomsUserManager : UserManager<ApplicationUser> {
        private readonly PodnomsDbContext _context;
        private readonly GravatarHttpClient _gravatarClient;
        private readonly StorageSettings _storageSettings;

        public PodNomsUserManager(IUserStore<ApplicationUser> store, IOptions<IdentityOptions> optionsAccessor,
                    IPasswordHasher<ApplicationUser> passwordHasher, IEnumerable<IUserValidator<ApplicationUser>> userValidators,
                    IEnumerable<IPasswordValidator<ApplicationUser>> passwordValidators, ILookupNormalizer keyNormalizer,
                    IdentityErrorDescriber errors, IServiceProvider services, ILogger<UserManager<ApplicationUser>> logger,
                    [FromServices]GravatarHttpClient gravatarClient,
                    IOptions<StorageSettings> storageSettings) :
            base(store, optionsAccessor, passwordHasher, userValidators, passwordValidators, keyNormalizer, errors, services, logger) {
            this._gravatarClient = gravatarClient;
            this._storageSettings = storageSettings.Value;
        }
        public override async Task<IdentityResult> CreateAsync(ApplicationUser user) {
            _slugify(user);
            _checkName(user);
            await _imageify(user);
            return await base.CreateAsync(user);
        }
        public override async Task<IdentityResult> UpdateAsync(ApplicationUser user) {
            _slugify(user);
            _checkName(user);
            await _imageify(user);
            return await base.UpdateAsync(user);
        }
        private void _checkName(ApplicationUser user) {
            if (string.IsNullOrEmpty(user.FirstName)) {
                user.FirstName = "PodNoms";
                user.LastName = "User";
            }
        }

        private async Task _imageify(ApplicationUser user) {
            if (string.IsNullOrEmpty(user.PictureUrl)) {
                var gravatar = await this._gravatarClient.GetGravatarImage(user.Email);
                if (!string.IsNullOrEmpty(gravatar)) {
                    user.PictureUrl = gravatar;
                } else {
                    int index = Randomisers.RandomInteger(1, 6);
                    user.PictureUrl = $"{_storageSettings.CdnUrl}static/images/avatars/avatar-{index}.svg";
                }
            }
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