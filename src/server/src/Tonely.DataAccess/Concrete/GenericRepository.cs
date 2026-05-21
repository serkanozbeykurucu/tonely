using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using Tonely.DataAccess.Abstract;
using Tonely.DataAccess.Context;
using Tonely.Entity.Abstract;

namespace Tonely.DataAccess.Concrete;

public class GenericRepository<T> : IGenericDal<T> where T : class, IEntity, new()
{
    protected readonly TonelyDbContext _context;
    protected readonly DbSet<T> _dbSet;

    public GenericRepository(TonelyDbContext context)
    {
        _context = context;
        _dbSet = _context.Set<T>();
    }

    public async Task<T?> GetAsync(Expression<Func<T, bool>> filter)
    {
        return await _dbSet.AsNoTracking().FirstOrDefaultAsync(filter);
    }

    public async Task<List<T>> GetListAsync(Expression<Func<T, bool>>? filter = null)
    {
        if (filter == null)
            return await _dbSet.AsNoTracking().ToListAsync();

        return await _dbSet.AsNoTracking().Where(filter).ToListAsync();
    }

    public IQueryable<T> GetQueryable()
    {
        return _dbSet.AsNoTracking();
    }

    public async Task<T> AddAsync(T entity)
    {
        await _dbSet.AddAsync(entity);
        await _context.SaveChangesAsync();
        return entity;
    }

    public async Task<List<T>> AddRangeAsync(List<T> entities)
    {
        await _dbSet.AddRangeAsync(entities);
        await _context.SaveChangesAsync();
        return entities;
    }

    public async Task<T> UpdateAsync(T entity)
    {
        _dbSet.Update(entity);
        await _context.SaveChangesAsync();
        return entity;
    }

    public async Task DeleteAsync(T entity)
    {
        entity.IsDeleted = true;
        _dbSet.Update(entity);
        await _context.SaveChangesAsync();
    }

    public async Task<int> CountAsync(Expression<Func<T, bool>>? filter = null)
    {
        if (filter == null)
            return await _dbSet.AsNoTracking().CountAsync();

        return await _dbSet.AsNoTracking().Where(filter).CountAsync();
    }
}