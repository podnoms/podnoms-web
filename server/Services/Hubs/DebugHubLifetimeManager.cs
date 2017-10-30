using Microsoft.AspNetCore.SignalR;

namespace PodNoms.Api.Services.Hubs
{
    public class DebugHubLifetimeManager<THub> : DefaultHubLifetimeManager<THub>
         where THub : Hub
    {

    }
}