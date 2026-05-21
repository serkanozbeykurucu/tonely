using Microsoft.Extensions.Logging.Abstractions;
using Microsoft.Extensions.Options;
using NSubstitute;
using Tonely.Business.Abstract;
using Tonely.Business.Concrete;
using Tonely.DataAccess.Abstract;
using Tonely.Shared.Constants;
using Tonely.Shared.Exceptions;
using Tonely.Shared.Settings;

namespace Tonely.Business.Tests;

public class UsageLimitServiceTests
{
    private const string userId = "1ab2c3d4-e5f6-7890-abcd-ef1234567890";
    private static readonly Guid conversationId = Guid.Parse("aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee");

    private static IOptions<PlanLimitsSettings> Settings(int maxConversations, int rateLimitPerMinute = 5)
    {
        var s = new PlanLimitsSettings
        {
            Plans = new Dictionary<string, PlanLimit>
            {
                [RoleConstants.Free] = new() { MaxConversations = maxConversations, RateLimitPerMinute = rateLimitPerMinute },
                [RoleConstants.Pro] = new() { MaxConversations = -1, RateLimitPerMinute = 30 }
            }
        };
        return Options.Create(s);
    }

    private static UsageLimitService Build(IMessageDal dal, IRateLimiter rateLimiter, IOptions<PlanLimitsSettings> opts) =>
        new(dal, rateLimiter, opts, NullLogger<UsageLimitService>.Instance);

    [Fact]
    public async Task WhenUnderLimit_Passes()
    {
        var dal = Substitute.For<IMessageDal>();
        dal.CountConversationsWithAssistantAsync(default!, default).ReturnsForAnyArgs(0);

        var limiter = Substitute.For<IRateLimiter>();
        limiter.TryAcquire(default!, default, default).ReturnsForAnyArgs(true);

        var svc = Build(dal, limiter, Settings(maxConversations: 1));

        await svc.EnsureAiMessageAllowedAsync(userId, RoleConstants.Free, conversationId);
    }

    [Fact]
    public async Task WhenAtLimit_ThrowsQuotaExceededException()
    {
        var dal = Substitute.For<IMessageDal>();
        dal.CountConversationsWithAssistantAsync(default!, default).ReturnsForAnyArgs(1);

        var limiter = Substitute.For<IRateLimiter>();
        limiter.TryAcquire(default!, default, default).ReturnsForAnyArgs(true);

        var svc = Build(dal, limiter, Settings(maxConversations: 1));

        await Assert.ThrowsAsync<QuotaExceededException>(() => svc.EnsureAiMessageAllowedAsync(userId, RoleConstants.Free, conversationId));
    }

    [Fact]
    public async Task WhenLimitIsUnlimited_AlwaysPasses()
    {
        var dal = Substitute.For<IMessageDal>();
        dal.CountConversationsWithAssistantAsync(default!, default).ReturnsForAnyArgs(9999);

        var limiter = Substitute.For<IRateLimiter>();
        limiter.TryAcquire(default!, default, default).ReturnsForAnyArgs(true);

        var svc = Build(dal, limiter, Settings(maxConversations: -1));

        await svc.EnsureAiMessageAllowedAsync(userId, RoleConstants.Pro, conversationId);
    }

    [Fact]
    public async Task WhenProPlan_UnlimitedConversationsPass()
    {
        var dal = Substitute.For<IMessageDal>();
        dal.CountConversationsWithAssistantAsync(default!, default).ReturnsForAnyArgs(500);

        var limiter = Substitute.For<IRateLimiter>();
        limiter.TryAcquire(default!, default, default).ReturnsForAnyArgs(true);

        var svc = Build(dal, limiter, Settings(maxConversations: 1));

        await svc.EnsureAiMessageAllowedAsync(userId, RoleConstants.Pro, conversationId);
    }

    [Fact]
    public async Task WhenRateLimited_ThrowsQuotaExceededException()
    {
        var dal = Substitute.For<IMessageDal>();
        dal.CountConversationsWithAssistantAsync(default!, default).ReturnsForAnyArgs(0);

        var limiter = Substitute.For<IRateLimiter>();
        limiter.TryAcquire(default!, default, default).ReturnsForAnyArgs(false);

        var svc = Build(dal, limiter, Settings(maxConversations: 5));

        await Assert.ThrowsAsync<QuotaExceededException>(() => svc.EnsureAiMessageAllowedAsync(userId, RoleConstants.Free, conversationId));
    }

    [Fact]
    public async Task QuotaCheck_RunsBeforeRateLimit()
    {
        var dal = Substitute.For<IMessageDal>();
        dal.CountConversationsWithAssistantAsync(default!, default).ReturnsForAnyArgs(1);

        var limiter = Substitute.For<IRateLimiter>();
        limiter.TryAcquire(default!, default, default).ReturnsForAnyArgs(true);

        var svc = Build(dal, limiter, Settings(maxConversations: 1));

        await Assert.ThrowsAsync<QuotaExceededException>(
            () => svc.EnsureAiMessageAllowedAsync(userId, RoleConstants.Free, conversationId));

        limiter.DidNotReceiveWithAnyArgs().TryAcquire(default!, default, default);
    }

    [Fact]
    public async Task WhenRoleUnknown_FallsBackToFreePlan_AndExceedsQuota()
    {
        var dal = Substitute.For<IMessageDal>();
        dal.CountConversationsWithAssistantAsync(default!, default).ReturnsForAnyArgs(1);

        var limiter = Substitute.For<IRateLimiter>();
        limiter.TryAcquire(default!, default, default).ReturnsForAnyArgs(true);

        var svc = Build(dal, limiter, Settings(maxConversations: 1));

        await Assert.ThrowsAsync<QuotaExceededException>(() => svc.EnsureAiMessageAllowedAsync(userId, "UnknownRole", conversationId));
    }

    [Fact]
    public async Task MultipleMessagesInSameConversation_CountsAsOne()
    {
        var dal = Substitute.For<IMessageDal>();
        dal.CountConversationsWithAssistantAsync(default!, default).ReturnsForAnyArgs(0);

        var limiter = Substitute.For<IRateLimiter>();
        limiter.TryAcquire(default!, default, default).ReturnsForAnyArgs(true);

        var svc = Build(dal, limiter, Settings(maxConversations: 1));

        await svc.EnsureAiMessageAllowedAsync(userId, RoleConstants.Free, conversationId);
    }

    [Fact]
    public async Task SecondConversationAfterFirstCompleted_IsBlocked()
    {
        var newConversationId = Guid.NewGuid();

        var dal = Substitute.For<IMessageDal>();
        dal.CountConversationsWithAssistantAsync(default!, default).ReturnsForAnyArgs(1);

        var limiter = Substitute.For<IRateLimiter>();
        limiter.TryAcquire(default!, default, default).ReturnsForAnyArgs(true);

        var svc = Build(dal, limiter, Settings(maxConversations: 1));

        await Assert.ThrowsAsync<QuotaExceededException>(
            () => svc.EnsureAiMessageAllowedAsync(userId, RoleConstants.Free, newConversationId));
    }
}