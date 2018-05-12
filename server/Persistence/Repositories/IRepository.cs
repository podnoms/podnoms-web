using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using PodNoms.Api.Models;
using PodNoms.Api.Models.Annotations;

namespace PodNoms.Api.Persistence {
    public interface IRepository<TEntity> where TEntity : class, IEntity {
        IQueryable<TEntity> GetAll();
        Task<TEntity> GetAsync(int id);
        TEntity Create(TEntity entity);
        TEntity Update(TEntity entity);
        TEntity AddOrUpdate(TEntity entity);
        Task DeleteAsync(int id);
    }

    public abstract class GenericRepository<TEntity> : IRepository<TEntity> where TEntity : class, IEntity {
        private PodNomsDbContext _context;
        private readonly ILogger<GenericRepository<TEntity>> _logger;

        public GenericRepository(PodNomsDbContext context, ILogger<GenericRepository<TEntity>> logger) {
            _context = context;
            _logger = logger;
        }

        public PodNomsDbContext GetContext() {
            return _context;
        }

        public IQueryable<TEntity> GetAll() {
            return _context.Set<TEntity>();
        }
        public async Task<TEntity> GetAsync(int id) {
            return await _context.Set<TEntity>()
                .FirstOrDefaultAsync(e => e.Id == id);
        }

        public TEntity Create(TEntity entity) {
            if (entity is ISluggedEntity) {
                (entity as ISluggedEntity).Slug = (entity as ISluggedEntity).GetSlug(_context, _logger);
            }
            var ret = _context.Set<TEntity>().Add(entity);
            return entity;
        }

        public TEntity Update(TEntity entity) {
            var ret = _context.Set<TEntity>().Update(entity);
            return entity;
        }

        public TEntity AddOrUpdate(TEntity entity) {
            var ret = entity;
            if (entity.Id != 0) {
                // _context.Entry(entry).State = EntityState.Modified
                ret = Update(entity);
            } else {
                ret = Create(entity);
            }
            return ret;
        }

        public async Task DeleteAsync(int id) {
            var entity = await _context.Set<TEntity>().FindAsync(id);
            _context.Set<TEntity>().Remove(entity);
        }
    }
}