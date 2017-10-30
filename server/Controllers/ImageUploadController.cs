using System;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using ImageSharp;
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

namespace PodNoms.Api.Controllers
{
    [Authorize]
    [Route("/podcast/{slug}/imageupload")]
    public class ImageUploadController : Controller
    {
        private readonly IPodcastRepository _repository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly ImageFileStorageSettings _imageFileStorageSettings;
        private readonly ILogger<ImageUploadController> _logger;
        public readonly IFileUploader _fileUploader;

        public ImageUploadController(IPodcastRepository repository, IUnitOfWork unitOfWork,
                IFileUploader fileUploader, IOptions<ImageFileStorageSettings> imageFileStorageSettings,
                ILoggerFactory loggerFactory, IMapper mapper)
        {
            this._fileUploader = fileUploader;
            this._imageFileStorageSettings = imageFileStorageSettings.Value;
            this._repository = repository;
            this._unitOfWork = unitOfWork;
            this._mapper = mapper;
            this._logger = loggerFactory.CreateLogger<ImageUploadController>();
        }
        [HttpPost]
        public async Task<IActionResult> Upload(string slug, IFormFile file)
        {
            _logger.LogDebug("Uploading new image");
            var email = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
            if (!string.IsNullOrEmpty(email))
            {
                if (file == null || file.Length == 0) return BadRequest("No file found in stream");
                if (file.Length > _imageFileStorageSettings.MaxUploadFileSize) return BadRequest("Maximum file size exceeded");
                if (!_imageFileStorageSettings.IsSupported(file.FileName)) return BadRequest("Invalid file type");

                var podcast = await _repository.GetAsync(email, slug);
                if (podcast == null)
                    return NotFound();

                var cacheFile = await CachedFormFileStorage.CacheItem(file);
                (var finishedFile, var extension) = __todo_convert_cache_file(cacheFile, podcast.Uid);
                
                var destinationFile = $"{System.Guid.NewGuid().ToString()}.{extension}";
                podcast.ImageUrl = destinationFile;

                var imageUrl = await _fileUploader.UploadFile(finishedFile, _imageFileStorageSettings.ContainerName,
                    destinationFile, (p, t) => _logger.LogDebug($"Uploading image: {p} - {t}"));

                _repository.AddOrUpdateAsync(podcast);

                await this._unitOfWork.CompleteAsync();

                return new OkObjectResult(_mapper.Map<Podcast, PodcastViewModel>(podcast));
            }
            return Unauthorized();
        }

        //TODO: Refactor this to service
        private (string, string) __todo_convert_cache_file(string cacheFile, string prefix)
        {
            var outputFile = Path.Combine(Path.GetTempPath(), $"{prefix}.jpg");
            using (Image<Rgba32> image = Image.Load(cacheFile))
            {
                image.Save(outputFile);
            }

            return (outputFile, "jpg");
        }
    }
}