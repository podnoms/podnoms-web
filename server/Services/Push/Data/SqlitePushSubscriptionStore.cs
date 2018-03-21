using System;
using System.Threading.Tasks;
using Lib.Net.Http.WebPush;
using Microsoft.EntityFrameworkCore;
using PodNoms.Api.Services.Push;
using PodNoms.Api.Services.Push.Data;

namespace PodNoms.Api.Services.Push.Data {
    internal class SqlitePushSubscriptionStore : IPushSubscriptionStore {
        private readonly PushSubscriptionContext _context;

        public SqlitePushSubscriptionStore(PushSubscriptionContext context) {
            _context = context;
        }

        public Task StoreSubscriptionAsync(PushSubscription subscription) {
            _context.Subscriptions.Add(new PushSubscriptionContext.PushSubscription(subscription));

            return _context.SaveChangesAsync();
        }

        public async Task DiscardSubscriptionAsync(string endpoint) {
            PushSubscriptionContext.PushSubscription subscription = await _context.Subscriptions.FindAsync(endpoint);

            _context.Subscriptions.Remove(subscription);

            await _context.SaveChangesAsync();
        }

        public Task ForEachSubscriptionAsync(Action<PushSubscription> action) {
            return _context.Subscriptions.AsNoTracking().ForEachAsync(action);
        }
    }
}
