namespace Tonely.Business.Abstract;

public interface IRateLimiter
{
    bool TryAcquire(string key, int maxRequests, TimeSpan window);
}