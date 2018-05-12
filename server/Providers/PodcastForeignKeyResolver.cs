using System.Threading.Tasks;
using AutoMapper;
using PodNoms.Api.Models;
using PodNoms.Api.Models.ViewModels;
using PodNoms.Api.Persistence;

namespace PodNoms.Api.Providers {
    internal class PodcastForeignKeyResolver : IValueResolver<PodcastEntryViewModel, PodcastEntry, Podcast> {
        private IPodcastRepository _sourceRepository;

        public PodcastForeignKeyResolver(IPodcastRepository sourceRepository) {
            this._sourceRepository = sourceRepository;
        }

        public Podcast Resolve(PodcastEntryViewModel source, PodcastEntry destination, Podcast destMember, ResolutionContext context) {
            return Task.Run(async () => await _sourceRepository.GetAsync(source.PodcastId)).Result;
        }
    }
}