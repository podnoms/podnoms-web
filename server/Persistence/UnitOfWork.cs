using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using PodNoms.Api.Persistence;

namespace PodNoms.Api.Persistence {
    public class UnitOfWork : IUnitOfWork {
        private readonly PodNomsDbContext _context;
        private readonly ILogger<UnitOfWork> _logger;
        public UnitOfWork(PodNomsDbContext context, ILogger<UnitOfWork> logger) {
            this._logger = logger;
            this._context = context;
        }
        public async Task<bool> CompleteAsync() {
            try {
                await Task.FromResult<object>(null);
                await _context.SaveChangesAsync();
                return true;
            } catch (DbUpdateException dbe) {
                this._logger.LogError($"Error completing unit of work: {dbe.Message}\n{dbe.InnerException.Message}");
            }
            return false;
        }
    }
}
