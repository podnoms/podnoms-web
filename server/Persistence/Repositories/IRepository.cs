using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PodNoms.Api.Models;

namespace PodNoms.Api.Persistence {
    public interface IRepository<TEntity> where TEntity : class, IEntity {
        IQueryable<TEntity> GetAll();
        Task<TEntity> GetAsync(int id);
        Task<TEntity> CreateAsync(TEntity entity);
        Task<TEntity> UpdateAsync(TEntity entity);
        Task<TEntity> AddOrUpdateAsync(TEntity entity);
        Task DeleteAsync(int id);
    }

    public abstract class GenericRepository<TEntity> : IRepository<TEntity> where TEntity : class, IEntity {
        private PodNomsDbContext _context;

        public GenericRepository(PodNomsDbContext context) {
            _context = context;
        }

        public PodNomsDbContext GetContext() {
            return _context;
        }

        public IQueryable<TEntity> GetAll() {
            return _context.Set<TEntity>().AsNoTracking();
        }
        public async Task<TEntity> GetAsync(int id) {
            return await _context.Set<TEntity>()
                .AsNoTracking()
                .FirstOrDefaultAsync(e => e.Id == id);
        }

        public async Task<TEntity> CreateAsync(TEntity entity) {
            var ret = await _context.Set<TEntity>().AddAsync(entity);
            await _context.SaveChangesAsync();
            return ret as TEntity;
        }

        public async Task<TEntity> UpdateAsync(TEntity entity) {
            var ret = _context.Set<TEntity>().Update(entity);
            await _context.SaveChangesAsync();
            return ret as TEntity;
        }

        public async Task<TEntity> AddOrUpdateAsync(TEntity entity) {
            var ret = entity;
            if (entity.Id != 0) {
                // _context.Entry(entry).State = EntityState.Modified
                ret = await UpdateAsync(entity);
            } else {
                ret = await CreateAsync(entity);
            }
            await _context.SaveChangesAsync();
            return ret;
        }

        public async Task DeleteAsync(int id) {
            var entity = await _context.Set<TEntity>().FindAsync(id);
            _context.Set<TEntity>().Remove(entity);
        }
    }
}