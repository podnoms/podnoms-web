using System;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using PodNoms.Api.Models;
using PodNoms.Api.Models.ViewModels;
using PodNoms.Api.Persistence;
using PodNoms.Api.Services;
using PodNoms.Api.Services.Storage;
using PodNoms.Api.Utils;
using Microsoft.AspNetCore.Identity;
using PodNoms.Api.Services.Auth;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.PixelFormats;
using SixLabors.ImageSharp.Processing;
using SixLabors.ImageSharp.Processing.Transforms;
using SixLabors.ImageSharp.Processing.Filters;

namespace PodNoms.Api.Controllers {
    [Authorize]
    [Route("/podcast/{slug}/imageupload")]
    public class ImageUploadController : BaseAuthController {
        private readonly IPodcastRepository _repository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly ImageFileStorageSettings _imageFileStorageSettings;
        private readonly ILogger<ImageUploadController> _logger;
        public readonly IFileUploader _fileUploader;

        public ImageUploadController(IPodcastRepository repository, IUnitOfWork unitOfWork,
                IFileUploader fileUploader, IOptions<ImageFileStorageSettings> imageFileStorageSettings,
                ILoggerFactory loggerFactory, IMapper mapper, UserManager<ApplicationUser> userManager, IHttpContextAccessor contextAccessor)
            : base(contextAccessor, userManager) {

            this._fileUploader = fileUploader;
            this._imageFileStorageSettings = imageFileStorageSettings.Value;
            this._repository = repository;
            this._unitOfWork = unitOfWork;
            this._mapper = mapper;
            this._logger = loggerFactory.CreateLogger<ImageUploadController>();
        }
        [HttpPost]
        public async Task<IActionResult> Upload(string slug, IFormFile file) {
            _logger.LogDebug("Uploading new image");
            if (file == null || file.Length == 0) return BadRequest("No file found in stream");
            if (file.Length > _imageFileStorageSettings.MaxUploadFileSize) return BadRequest("Maximum file size exceeded");
            if (!_imageFileStorageSettings.IsSupported(file.FileName)) return BadRequest("Invalid file type");

            var podcast = await _repository.GetAsync(_applicationUser.Id, slug);
            if (podcast == null)
                return NotFound();

            var cacheFile = await CachedFormFileStorage.CacheItem(file);
            (var finishedFile, var extension) = __todo_convert_cache_file(cacheFile, podcast.Uid);
            var thumbnailFile = __todo_create_thumbnail(cacheFile, podcast.Uid);

            var destinationFile = $"{podcast.Uid}.{extension}";
            var destinationFileThumbnail = $"{podcast.Uid}-32x32.{extension}";

            await _fileUploader.UploadFile(finishedFile, _imageFileStorageSettings.ContainerName,
                destinationFile, "image/png", (p, t) => _logger.LogDebug($"Uploading image: {p} - {t}"));

            await _fileUploader.UploadFile(thumbnailFile, _imageFileStorageSettings.ContainerName,
                           destinationFileThumbnail, "image/png", (p, t) => _logger.LogDebug($"Uploading image: {p} - {t}"));

            await _repository.AddOrUpdateAsync(podcast);
            podcast.TemporaryImageUrl = string.Empty;
            await this._unitOfWork.CompleteAsync();

            return new OkObjectResult(_mapper.Map<Podcast, PodcastViewModel>(podcast));
        }

        //TODO: Refactor this to service
        private (string, string) __todo_convert_cache_file(string cacheFile, string prefix) {
            // return (cacheFile, "jpg");
            var outputFile = Path.Combine(Path.GetTempPath(), $"{prefix}.png");
            if (System.IO.File.Exists(outputFile))
                System.IO.File.Delete(outputFile);

            using (Image<Rgba32> image = Image.Load(cacheFile)) {
                image.Mutate(x => x
                    .Resize(1400, 1400));
                using (var outputStream = new FileStream(outputFile, FileMode.CreateNew)) {
                    image.SaveAsPng(outputStream);
                }
            }
            return (outputFile, "png");
        }
        private string __todo_create_thumbnail(string cacheFile, string prefix) {
            // return (cacheFile, "jpg");
            var outputFile = Path.Combine(Path.GetTempPath(), $"{prefix}-32x32.png");
            if (System.IO.File.Exists(outputFile))
                System.IO.File.Delete(outputFile);

            using (Image<Rgba32> image = Image.Load(cacheFile)) {
                image.Mutate(x => x
                    .Resize(32, 32));
                using (var outputStream = new FileStream(outputFile, FileMode.CreateNew)) {
                    image.SaveAsPng(outputStream);
                }
            }
            return outputFile;
        }
    }
}
