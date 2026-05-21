namespace Tonely.Business.Abstract;

public interface IUsageLimitService
{
    Task EnsureAiMessageAllowedAsync(string userId, string userRole, Guid conversationId, CancellationToken cancellationToken = default);
}