using Microsoft.Extensions.AI;

namespace Tonely.HttpApi.Host.Data;

internal sealed class NoOpChatClient : IChatClient
{
    public ChatClientMetadata Metadata => new("no-op", null, null);

    public Task<ChatResponse> GetResponseAsync(
        IEnumerable<ChatMessage> messages,
        ChatOptions? options = null,
        CancellationToken cancellationToken = default)
    {
        var response = new ChatResponse([new ChatMessage(ChatRole.Assistant, "AI service not configured. Please set AI_API_KEY in .env")]);
        return Task.FromResult(response);
    }

    public IAsyncEnumerable<ChatResponseUpdate> GetStreamingResponseAsync(
        IEnumerable<ChatMessage> messages,
        ChatOptions? options = null,
        CancellationToken cancellationToken = default)
    {
        return AsyncEnumerable.Empty<ChatResponseUpdate>();
    }

    public object? GetService(Type serviceType, object? serviceKey) => null;
    public void Dispose() { }
}