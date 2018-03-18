using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using PodNoms.Api.Persistence;

namespace PodNoms.Api.Persistence {
    public class UnitOfWork : IUnitOfWork {
        private readonly PodnomsDbContext _context;
        private readonly ILogger<UnitOfWork> _logger;
        public UnitOfWork(PodnomsDbContext context, ILogger<UnitOfWork> logger) {
            this._logger = logger;
            this._context = context;
        }
        public async Task CompleteAsync() {
            try {
                await _context.SaveChangesAsync();
            } catch (DbUpdateException dbe) {
                this._logger.LogError($"Error completing unit of work: {dbe.Message}\n{dbe.InnerException.Message}");
            }
        }
    }
}
