using System;
using System.Linq;
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
            PushSubscriptionContext.PushSubscription entity = new PushSubscriptionContext.PushSubscription(subscription);
            var key = entity.Auth;
            _context.Subscriptions.Add(entity);

            return _context.SaveChangesAsync();
        }

        public async Task DiscardSubscriptionAsync(string endpoint) {
            PushSubscriptionContext.PushSubscription subscription = await _context.Subscriptions.FindAsync(endpoint);

            _context.Subscriptions.Remove(subscription);

            await _context.SaveChangesAsync();
        }
        public Task ForEachSubscriptionAsync(string uid, Action<PushSubscription> action) {
            return _context.Subscriptions.Where(e => e.Auth == uid).AsNoTracking().ForEachAsync(action);
        }
        public Task ForEachSubscriptionAsync(Action<PushSubscription> action) {
            return _context.Subscriptions.AsNoTracking().ForEachAsync(action);
        }
    }
}
