using Microsoft.Extensions.AI;
using System.Net;
using System.Runtime.CompilerServices;
using Tonely.Shared.Exceptions;

namespace Tonely.HttpApi.Host.Data;

internal sealed class FallbackChatClient : IChatClient
{
    private readonly IReadOnlyList<IChatClient> _clients;
    private readonly ILogger<FallbackChatClient> _logger;

    public FallbackChatClient(IReadOnlyList<IChatClient> clients, ILogger<FallbackChatClient> logger)
    {
        if (clients.Count == 0) throw new ArgumentException("At least one client is required.", nameof(clients));
        _clients = clients;
        _logger = logger;
    }

    public async Task<ChatResponse> GetResponseAsync(
        IEnumerable<ChatMessage> messages,
        ChatOptions? options = null,
        CancellationToken cancellationToken = default)
    {
        for (var i = 0; i < _clients.Count; i++)
        {
            try
            {
                return await _clients[i].GetResponseAsync(messages, options, cancellationToken);
            }
            catch (Exception ex) when (IsRateLimitException(ex) && i < _clients.Count - 1)
            {
                _logger.LogWarning("Gemini API key #{Index} is rate limited (429), falling back to key #{Next}", i + 1, i + 2);
            }
        }

        throw new AiServiceException("All Gemini API keys are rate limited. Please try again later.");
    }

    public async IAsyncEnumerable<ChatResponseUpdate> GetStreamingResponseAsync(
        IEnumerable<ChatMessage> messages,
        ChatOptions? options = null,
        [EnumeratorCancellation] CancellationToken cancellationToken = default)
    {
        var (firstUpdate, remainder) = await GetFirstChunkWithFallbackAsync(messages, options, cancellationToken);

        if (firstUpdate is not null)
        {
            yield return firstUpdate;
        }

        await foreach (var update in remainder.WithCancellation(cancellationToken))
        {
            yield return update;
        }
    }

    private async Task<(ChatResponseUpdate? first, IAsyncEnumerable<ChatResponseUpdate> rest)> GetFirstChunkWithFallbackAsync(
        IEnumerable<ChatMessage> messages,
        ChatOptions? options,
        CancellationToken cancellationToken)
    {
        for (var i = 0; i < _clients.Count; i++)
        {
            var enumerator = _clients[i]
                .GetStreamingResponseAsync(messages, options, cancellationToken)
                .GetAsyncEnumerator(cancellationToken);

            try
            {
                if (!await enumerator.MoveNextAsync())
                {
                    return (null, AsyncEnumerable.Empty<ChatResponseUpdate>());
                }

                return (enumerator.Current, ConsumeRemainder(enumerator));
            }
            catch (Exception ex) when (IsRateLimitException(ex) && i < _clients.Count - 1)
            {
                _logger.LogWarning("Gemini API key #{Index} is rate limited (429), falling back to key #{Next}", i + 1, i + 2);
                await enumerator.DisposeAsync();
            }
            catch
            {
                await enumerator.DisposeAsync();
                throw;
            }
        }

        throw new AiServiceException("All Gemini API keys are rate limited. Please try again later.");
    }

    private static async IAsyncEnumerable<ChatResponseUpdate> ConsumeRemainder(
        IAsyncEnumerator<ChatResponseUpdate> enumerator)
    {
        try
        {
            while (await enumerator.MoveNextAsync())
            {
                yield return enumerator.Current;
            }
        }
        finally
        {
            await enumerator.DisposeAsync();
        }
    }

    private static bool IsRateLimitException(Exception ex)
    {
        if (ex is HttpRequestException { StatusCode: HttpStatusCode.TooManyRequests })
            return true;

        var message = (ex.Message ?? string.Empty) + (ex.InnerException?.Message ?? string.Empty);
        return message.Contains("429", StringComparison.Ordinal)
            || message.Contains("rate limit", StringComparison.OrdinalIgnoreCase)
            || message.Contains("quota exceeded", StringComparison.OrdinalIgnoreCase)
            || message.Contains("RESOURCE_EXHAUSTED", StringComparison.OrdinalIgnoreCase);
    }

    public object? GetService(Type serviceType, object? serviceKey) => _clients[0].GetService(serviceType, serviceKey);

    public void Dispose()
    {
        foreach (var client in _clients)
        {
            client.Dispose();
        }
    }
}