using System.Threading.Tasks;
using PodNoms.Api.Persistence;

namespace PodNoms.Api.Persistence {
    public class UnitOfWork : IUnitOfWork {
        private readonly PodnomsDbContext _context;
        public UnitOfWork(PodnomsDbContext context) {
            this._context = context;

        }
        public async Task CompleteAsync() {
            await _context.SaveChangesAsync();
        }
    }
}