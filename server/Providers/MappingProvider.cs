using AutoMapper;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using PodNoms.Api.Models;
using PodNoms.Api.Models.ViewModels;

namespace PodNoms.Api.Providers
{
    public class MappingProvider : Profile
    {
        private readonly IConfiguration _options;
        public MappingProvider() { }
        public MappingProvider(IConfiguration options)
        {
            this._options = options;

            //Domain to API Resource
            CreateMap<Podcast, PodcastViewModel>()
                .ForMember(
                    v => v.RssUrl,
                    e => e.MapFrom(m => $"{this._options.GetSection("App")["RssUrl"]}{m.User.Slug}/{m.Slug}"))
                .ForMember(
                    v => v.ImageUrl,
                    e => e.MapFrom(m => m.GetImageUrl(
                        this._options.GetSection("Storage")["CdnUrl"],
                        this._options.GetSection("ImageFileStorageSettings")["ContainerName"])));

            CreateMap<PodcastEntry, PodcastEntryViewModel>()
                .ForMember(
                    src => src.AudioUrl,
                    e => e.MapFrom(m => $"{this._options.GetSection("Storage")["CdnUrl"]}{m.AudioUrl}"));
                    
            CreateMap<User, ProfileViewModel>();

            //API Resource to Domain
            CreateMap<PodcastViewModel, Podcast>()
                .ForMember(v => v.ImageUrl, opt => opt.Ignore())
            ;
            CreateMap<PodcastEntryViewModel, PodcastEntry>()
                .ForMember(
                    e => e.ImageUrl,
                    opt => opt.MapFrom(m => m.ImageUrl))
            ;
        }
    }
}