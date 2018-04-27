using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using PodNoms.Api.Models;
using PodNoms.Api.Persistence;
using PodNoms.Api.Services.Storage;
using PodNoms.Api.Utils;
using PodNoms.Api.Utils.Extensions;

namespace PodNoms.Api.Persistence {
    public class PodcastRepository : IPodcastRepository {
        private readonly PodnomsDbContext _context;
        public IFileUploader _fileUploader { get; }
        public ImageFileStorageSettings _imageStorageSettings { get; }
        public PodcastRepository(PodnomsDbContext context, IFileUploader fileUploader, IOptions<ImageFileStorageSettings> imageStorageSettings) {
            this._imageStorageSettings = imageStorageSettings.Value;
            this._fileUploader = fileUploader;
            this._context = context;
        }
        public async Task<Podcast> GetAsync(int id) {
            var ret = await _context.Podcasts
                .Where(p => p.Id == id)
                .Include(p => p.AppUser)
                .FirstOrDefaultAsync();

            return ret;
        }
        public async Task<Podcast> GetAsync(string id, string slug) {
            var ret = await _context.Podcasts
                .Where(p => p.Slug == slug && p.AppUser.Id == id)
                .Include(p => p.PodcastEntries)
                .Include(p => p.AppUser)
                .FirstOrDefaultAsync();

            return ret;
        }
        public async Task<IEnumerable<Podcast>> GetAllAsync(string id) {
            var ret = _context.Podcasts
                .Where(u => u.AppUser.Id == id)
                .Include(p => p.AppUser)
                .OrderByDescending(p => p.Id);
            return await ret.ToListAsync();
        }
        public async Task<Podcast> AddOrUpdateAsync(Podcast item) {
            if (item.Id != 0) {
                _context.Entry(item).State = EntityState.Modified;
            } else {
                item.Uid = System.Guid.NewGuid().ToString();
                if (string.IsNullOrEmpty(item.Slug) && !string.IsNullOrEmpty(item.Title)) {
                    item.Slug = item.Title.Slugify(
                        from p in _context.Podcasts
                        select p.Slug);
                }
                item.TemporaryImageUrl = $"standard/podcast-image-{Randomisers.RandomInteger(1, 16)}.png";
                _context.Podcasts.Add(item);
            }

            return item;
        }
        public async Task<int> DeleteAsync(int id) {
            var podcast = await _context.Podcasts.SingleAsync(p => p.Id == id);
            if (podcast != null) {
                if (podcast.PodcastEntries != null) {
                    foreach (var entry in podcast.PodcastEntries) {
                        _context.Remove(entry);
                    }
                }
                _context.Remove<Podcast>(podcast);
            }
            return -1;
        }
    }
}