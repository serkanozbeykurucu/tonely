using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Tonely.Business.Abstract;
using Tonely.DataAccess.Abstract;
using Tonely.Shared.Exceptions;
using Tonely.Shared.Settings;

namespace Tonely.Business.Concrete;

public class UsageLimitService : IUsageLimitService
{
    private readonly IMessageDal _messageDal;
    private readonly IRateLimiter _rateLimiter;
    private readonly PlanLimitsSettings _settings;
    private readonly ILogger<UsageLimitService> _logger;

    public UsageLimitService(
        IMessageDal messageDal,
        IRateLimiter rateLimiter,
        IOptions<PlanLimitsSettings> settings,
        ILogger<UsageLimitService> logger)
    {
        _messageDal = messageDal;
        _rateLimiter = rateLimiter;
        _settings = settings.Value;
        _logger = logger;
    }

    public async Task EnsureAiMessageAllowedAsync(string userId, string userRole, Guid conversationId, CancellationToken cancellationToken = default)
    {
        var limit = _settings.GetForRole(userRole);

        if (limit.MaxConversations >= 0)
        {
            var conversationCount = await _messageDal.CountConversationsWithAssistantAsync(userId, conversationId);
            if (conversationCount >= limit.MaxConversations)
            {
                _logger.LogWarning(
                    "Quota exceeded for user {UserId} on role {Role}: conversation count {Count}/{Max}",
                    userId, userRole, conversationCount, limit.MaxConversations);
                throw new QuotaExceededException($"You have reached the maximum of {limit.MaxConversations} conversation(s) on your plan.");
            }
        }

        if (!_rateLimiter.TryAcquire($"ai:{userId}", limit.RateLimitPerMinute, TimeSpan.FromMinutes(1)))
        {
            _logger.LogWarning(
                "Rate limit exceeded for user {UserId} on role {Role}: {Limit} req/min",
                userId, userRole, limit.RateLimitPerMinute);
            throw new QuotaExceededException("Too many requests. Please wait before sending another message.");
        }
    }
}