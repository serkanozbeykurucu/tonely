using Tonely.Entity.Concrete;

namespace Tonely.Business.Abstract;

public interface IAiMessageService
{
    IAsyncEnumerable<string> ChatStreamingAsync(
        IReadOnlyList<Message> history,
        string userMessage,
        string userFirstName,
        string? locale = null,
        CancellationToken cancellationToken = default);
}