using Microsoft.Extensions.Caching.Memory;
using Tonely.Business.Concrete;

namespace Tonely.Business.Tests;

public class InMemoryRateLimiterTests
{
    private static InMemoryRateLimiter CreateLimiter() => new(new MemoryCache(new MemoryCacheOptions()));

    [Fact]
    public void FirstRequest_IsAllowed()
    {
        var limiter = CreateLimiter();

        var result = limiter.TryAcquire("user", maxRequests: 3, TimeSpan.FromMinutes(1));

        Assert.True(result);
    }

    [Fact]
    public void RequestsWithinLimit_AreAllowed()
    {
        var limiter = CreateLimiter();

        limiter.TryAcquire("user", maxRequests: 3, TimeSpan.FromMinutes(1));
        limiter.TryAcquire("user", maxRequests: 3, TimeSpan.FromMinutes(1));
        var result = limiter.TryAcquire("user", maxRequests: 3, TimeSpan.FromMinutes(1));

        Assert.True(result);
    }

    [Fact]
    public void RequestBeyondLimit_IsBlocked()
    {
        var limiter = CreateLimiter();

        limiter.TryAcquire("user", maxRequests: 3, TimeSpan.FromMinutes(1));
        limiter.TryAcquire("user", maxRequests: 3, TimeSpan.FromMinutes(1));
        limiter.TryAcquire("user", maxRequests: 3, TimeSpan.FromMinutes(1));
        var result = limiter.TryAcquire("user", maxRequests: 3, TimeSpan.FromMinutes(1));

        Assert.False(result);
    }

    [Fact]
    public void LimitOfOne_SecondRequestIsBlocked()
    {
        var limiter = CreateLimiter();

        limiter.TryAcquire("user", maxRequests: 1, TimeSpan.FromMinutes(1));
        var result = limiter.TryAcquire("user", maxRequests: 1, TimeSpan.FromMinutes(1));

        Assert.False(result);
    }

    [Fact]
    public void DifferentKeys_AreTrackedIndependently()
    {
        var limiter = CreateLimiter();

        limiter.TryAcquire("user", maxRequests: 1, TimeSpan.FromMinutes(1));
        limiter.TryAcquire("user", maxRequests: 1, TimeSpan.FromMinutes(1));

        var result = limiter.TryAcquire("other-user", maxRequests: 1, TimeSpan.FromMinutes(1));

        Assert.True(result);
    }

    [Fact]
    public void ExpiredWindow_AllowsNewRequests()
    {
        var limiter = CreateLimiter();
        var shortWindow = TimeSpan.FromMilliseconds(50);

        limiter.TryAcquire("user", maxRequests: 1, shortWindow);
        limiter.TryAcquire("user", maxRequests: 1, shortWindow);

        Thread.Sleep(100);

        var result = limiter.TryAcquire("user", maxRequests: 1, shortWindow);
        Assert.True(result);
    }
}