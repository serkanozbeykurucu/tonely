using Microsoft.Extensions.Caching.Memory;
using Tonely.Business.Abstract;

namespace Tonely.Business.Concrete;

public class InMemoryRateLimiter : IRateLimiter
{
    private readonly IMemoryCache _cache;
    private static readonly object _lock = new();

    public InMemoryRateLimiter(IMemoryCache cache)
    {
        _cache = cache;
    }

    public bool TryAcquire(string key, int maxRequests, TimeSpan window)
    {
        lock (_lock)
        {
            var now = DateTime.UtcNow;
            var expiry = now + window + TimeSpan.FromSeconds(10);

            var timestamps = _cache.GetOrCreate(key, entry =>
            {
                entry.AbsoluteExpiration = expiry;
                return new List<DateTime>();
            })!;

            timestamps.RemoveAll(t => t < now - window);

            if (timestamps.Count >= maxRequests)
            {
                return false;
            }
            
            timestamps.Add(now);
            _cache.Set(key, timestamps, expiry);
            return true;
        }
    }
}