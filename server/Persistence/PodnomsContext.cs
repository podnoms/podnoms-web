using System;
using System.IO;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.Extensions.Configuration;
using PodNoms.Api.Models;

namespace PodNoms.Api.Persistence {

    public class PodnomsDbContext : DbContext {
        public PodnomsDbContext(DbContextOptions<PodnomsDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            base.OnModelCreating(modelBuilder);


            modelBuilder.Entity<Podcast>()
                .Property(b => b.CreateDate)
                .HasDefaultValueSql("getdate()");

            modelBuilder.Entity<Podcast>()
                .Property(b => b.Slug)
                .IsUnicode(true);

            modelBuilder.Entity<PodcastEntry>()
                .Property(b => b.CreateDate)
                .HasDefaultValueSql("getdate()");

            modelBuilder.Entity<User>()
                .HasIndex(e => e.Slug)
                 .IsUnique(true);

        }

        public DbSet<Podcast> Podcasts { get; set; }
        public DbSet<PodcastEntry> PodcastEntries { get; set; }
        public DbSet<Playlist> Playlists { get; set; }
        public DbSet<User> Users { get; set; }
    }
}