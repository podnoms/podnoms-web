using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace PodNoms.Api.Services.Hubs {
    [Authorize]
    public class AudioProcessingHub : Hub {

    }
}