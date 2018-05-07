using System;
using System.IO;
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


            modelBuilder.Entity<Podcast>()
                .Property(b => b.CreateDate)
                .HasDefaultValueSql("getdate()");

            modelBuilder.Entity<Podcast>()
                .Property(b => b.Slug)
                .IsUnicode(true);

            modelBuilder.Entity<PodcastEntry>()
                .Property(b => b.CreateDate)
                .HasDefaultValueSql("getdate()");

        }

        public DbSet<Podcast> Podcasts { get; set; }
        public DbSet<PodcastEntry> PodcastEntries { get; set; }
        public DbSet<Playlist> Playlists { get; set; }
    }
}