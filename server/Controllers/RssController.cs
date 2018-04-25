using System;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Xml;
using HandlebarsDotNet;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using PodNoms.Api.Models;
using PodNoms.Api.Models.ViewModels.RssViewModels;
using PodNoms.Api.Persistence;
using PodNoms.Api.Services.Auth;
using PodNoms.Api.Utils;
using PodNoms.Api.Utils.Extensions;

namespace PodNoms.Api.Controllers {
    [Route("[controller]")]
    public class RssController : Controller {
        private readonly IPodcastRepository _podcastRepository;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ILogger _logger;
        private readonly AppSettings _appOptions;
        private readonly StorageSettings _storageOptions;
        private readonly ImageFileStorageSettings _imageOptions;

        public RssController(IPodcastRepository podcastRespository,
            IOptions<AppSettings> appOptions,
            IOptions<ImageFileStorageSettings> imageOptions,
            IOptions<StorageSettings> storageOptions,
            UserManager<ApplicationUser> userManager,
            ILoggerFactory loggerFactory) {
            _podcastRepository = podcastRespository;
            _userManager = userManager;
            _appOptions = appOptions.Value;
            _imageOptions = imageOptions.Value;
            _storageOptions = storageOptions.Value;
            _logger = loggerFactory.CreateLogger<RssController>();
        }

        [HttpGet("{slug}/{entry}")]
        [Produces("application/xml")]
        public async Task<IActionResult> Get(string slug, string entry) {
            _logger.LogDebug("RSS: Retrieving podcast");

            var user = await _userManager.FindBySlugAsync(slug);
            if (user != null) {
                var podcast = await _podcastRepository.GetAsync(user.Id, entry);
                if (podcast != null) {
                    string xml = ResourceReader.ReadResource("podcast.xml", _logger);
                    var template = Handlebars.Compile(xml);
                    var compiled = new PodcastEnclosureViewModel {
                        Title = podcast.Title,
                        Description = podcast.Description,
                        Author = "PodNoms Podcasts",
                        Image = podcast.GetImageUrl(_storageOptions.CdnUrl, _imageOptions.ContainerName),
                        Link = $"{_appOptions.RssUrl}{user.Slug}/{podcast.Slug}",
                        PublishDate = podcast.CreateDate.ToRFC822String(),
                        Language = "en-IE",
                        Copyright = $"© {DateTime.Now.Year} PodNoms",
                        Items = (
                            from e in podcast.PodcastEntries
                            select new PodcastEnclosureItemViewModel {
                                Title = e.Title.StripNonXMLChars(),
                                Description = e.Description.StripNonXMLChars(),
                                Author = e.Author.StripNonXMLChars(),
                                UpdateDate = e.CreateDate.ToRFC822String(),
                                AudioUrl = $"{_storageOptions.CdnUrl}{e.AudioUrl}",
                                AudioFileSize = e.AudioFileSize
                            }
                        ).ToList()
                    };
                    var result = template(compiled);
                    return Content(result, "application/xml");
                }
            }
            return NotFound();
        }
    }
}
