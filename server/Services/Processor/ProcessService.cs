using System;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json.Serialization;
using PodNoms.Api.Models;
using PodNoms.Api.Models.ViewModels;
using PodNoms.Api.Services.Realtime;

namespace PodNoms.Api.Services.Processor {
    internal class ProcessService {
        protected readonly ILogger _logger;
        protected readonly IRealTimeUpdater _realtime;
        protected readonly IMapper _mapper;
        protected readonly JsonSerializer _serializer;
        protected ProcessService(ILoggerFactory logger, IMapper mapper, IRealTimeUpdater pusher) {
            this._logger = logger.CreateLogger<UrlProcessService>();
            this._realtime = pusher;

            this._mapper = mapper;
            this._serializer = new JsonSerializer {
                ContractResolver = new CamelCasePropertyNamesContractResolver()
            };
        }

        protected async Task<bool> _sendProcessCompleteMessage(PodcastEntry entry) {
            var result = _mapper.Map<PodcastEntry, PodcastEntryViewModel>(entry);
            return await _sendProcessUpdate(entry.Podcast.AppUser.Id, entry.Uid, "info_processed", result);
        }
        protected async Task<bool> _sendProgressUpdate(string userId, string itemUid, ProcessProgressEvent data) {
            return await _realtime.SendProcessUpdate(userId, itemUid, "progress_update", data);
        }
        protected async Task<bool> _sendProcessUpdate(string userId, string itemUid, string message, PodcastEntryViewModel data) {
            try {
                return await _realtime.SendProcessUpdate(
                    userId,
                    itemUid,
                    message,
                    data);
            } catch (Exception ex) {
                _logger.LogError(123456, ex, "Error sending realtime message");
            }
            return false;
        }
    }
}