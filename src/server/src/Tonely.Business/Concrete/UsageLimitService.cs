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

    public UsageLimitService(
        IMessageDal messageDal,
        IRateLimiter rateLimiter,
        IOptions<PlanLimitsSettings> settings)
    {
        _messageDal = messageDal;
        _rateLimiter = rateLimiter;
        _settings = settings.Value;
    }

    public async Task EnsureAiMessageAllowedAsync(string userId, string userRole, Guid conversationId, CancellationToken cancellationToken = default)
    {
        var limit = _settings.GetForRole(userRole);

        if (limit.MaxConversations >= 0)
        {
            var conversationCount = await _messageDal.CountConversationsWithAssistantAsync(userId, conversationId);
            if (conversationCount >= limit.MaxConversations)
            {
                throw new QuotaExceededException($"You have reached the maximum of {limit.MaxConversations} conversation(s) on your plan.");
            }
        }

        if (!_rateLimiter.TryAcquire($"ai:{userId}", limit.RateLimitPerMinute, TimeSpan.FromMinutes(1)))
        {
            throw new QuotaExceededException("Too many requests. Please wait before sending another message.");
        }
    }
}