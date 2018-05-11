using System;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.Extensions.Configuration;
using PodNoms.Api.Models;
using PodNoms.Api.Services.Auth;

namespace PodNoms.Api.Persistence {

    public class PodnomsDbContext : IdentityDbContext<ApplicationUser> {
        public PodnomsDbContext(DbContextOptions<PodnomsDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            base.OnModelCreating(modelBuilder);
        }
        public override int SaveChanges() {
            _addTimestamps();
            return base.SaveChanges();
        }
        public override Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = default(System.Threading.CancellationToken)) {
            _addTimestamps();
            return base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
        }
        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default) {
            _addTimestamps();
            return base.SaveChangesAsync(cancellationToken);
        }
        void _addTimestamps() {
            var modifiedEntries = ChangeTracker.Entries()
                .Where(x => (x.State == EntityState.Added || x.State == EntityState.Modified));

            var now = DateTime.Now;
            foreach (var entry in modifiedEntries) {
                var entity = entry.Entity as BaseModel;
                if (entity != null) {
                    if (entry.State == EntityState.Added) {
                        entity.CreateDate = now;
                    }
                    entity.UpdateDate = now;
                }
            }
        }
        public DbSet<Podcast> Podcasts { get; set; }
        public DbSet<PodcastEntry> PodcastEntries { get; set; }
        public DbSet<Playlist> Playlists { get; set; }
        public DbSet<ParsedPlaylistItem> ParsedPlaylistItems { get; set; }
        public DbSet<ChatMessage> ChatMessages { get; set; }
    }
}
