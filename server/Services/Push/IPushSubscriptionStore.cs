using System;
using System.Threading.Tasks;
using Lib.Net.Http.WebPush;

namespace PodNoms.Api.Services.Push {
    public interface IPushSubscriptionStore {
        Task StoreSubscriptionAsync(PushSubscription subscription);
        Task ForEachSubscriptionAsync(Action<PushSubscription> action);
    }
}