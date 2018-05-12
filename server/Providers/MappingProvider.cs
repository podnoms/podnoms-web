using AutoMapper;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using PodNoms.Api.Models;
using PodNoms.Api.Models.ViewModels;
using PodNoms.Api.Services.Auth;

namespace PodNoms.Api.Providers {
    public class MappingProvider : Profile {
        private readonly IConfiguration _options;
        public MappingProvider() { }
        public MappingProvider(IConfiguration options) {
            this._options = options;

            //Domain to API Resource
            CreateMap<Podcast, PodcastViewModel>()
                .ForMember(
                    v => v.RssUrl,
                    e => e.MapFrom(m => $"{this._options.GetSection("App")["RssUrl"]}{m.AppUser.Slug}/{m.Slug}"))
                .ForMember(
                    v => v.ImageUrl,
                    e => e.MapFrom(m => m.GetImageUrl(
                        this._options.GetSection("Storage")["CdnUrl"],
                        this._options.GetSection("ImageFileStorageSettings")["ContainerName"])))
                .ForMember(
                    v => v.ThumbnailUrl,
                    e => e.MapFrom(m => m.GetThumbnailUrl(
                        this._options.GetSection("Storage")["CdnUrl"],
                        this._options.GetSection("ImageFileStorageSettings")["ContainerName"])));

            CreateMap<PodcastEntry, PodcastEntryViewModel>()
                .ForMember(
                    src => src.AudioUrl,
                    e => e.MapFrom(m => $"{this._options.GetSection("Storage")["CdnUrl"]}{m.AudioUrl}"))
                .ForMember(
                    src => src.PodcastId,
                    e => e.MapFrom(m => m.Podcast.Id))
                .ForMember(
                    src => src.Podcast,
                    e => e.MapFrom(m => m.Podcast))
                .ForMember(
                    src => src.Uid,
                    e => e.MapFrom(m => m.ExposedUid));

            CreateMap<ApplicationUser, ProfileViewModel>()
                .ForMember(
                    src => src.ProfileImage,
                    map => map.MapFrom(s => s.PictureUrl));

            CreateMap<ChatMessage, ChatViewModel>();

            //API Resource to Domain
            CreateMap<PodcastViewModel, Podcast>();
            CreateMap<PodcastEntryViewModel, PodcastEntry>()
                .ForMember(
                    e => e.ImageUrl,
                    map => map.MapFrom(vm => vm.ImageUrl))
                .ForMember(
                    e => e.Podcast,
                    opt => opt.ResolveUsing<PodcastForeignKeyResolver>());

            CreateMap<RegistrationViewModel, ApplicationUser>()
                .ForMember(
                    e => e.UserName,
                    map => map.MapFrom(vm => vm.Email));

            CreateMap<ChatViewModel, ChatMessage>();

        }
    }
}