using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Tonely.Business.Abstract;
using Tonely.Dto;
using Tonely.Shared.Exceptions;

namespace Tonely.HttpApi.Host.Hubs;

[Authorize(AuthenticationSchemes = "Identity.Bearer")]
public class MessageHub : Hub
{
    private readonly IMessageService _messageService;
    private readonly ILogger<MessageHub> _logger;

    public MessageHub(IMessageService messageService, ILogger<MessageHub> logger)
    {
        _messageService = messageService;
        _logger = logger;
    }

    public async Task SendMessage(string conversationId, string content)
    {
        if (!Guid.TryParse(conversationId, out var convId))
        {
            throw new HubException("Invalid conversation ID.");
        }

        var userId = Context.UserIdentifier;
        var request = new ChatRequest { ConversationId = convId, Content = content };
        var ct = Context.ConnectionAborted;

        try
        {
            await _messageService.ChatStreamAsync(
                request,
                onChunk: chunk => Clients.Caller.SendAsync("ReceiveChunk", chunk, ct),
                onComplete: dto => Clients.Caller.SendAsync("ChatCompleted", dto, ct),
                cancellationToken: ct);
        }
        catch (NotFoundException ex)
        {
            _logger.LogWarning("Conversation {ConversationId} not found for user {UserId}", convId, userId);
            throw new HubException(ex.Message);
        }
        catch (ValidationException ex)
        {
            _logger.LogWarning("Validation failed for user {UserId} on conversation {ConversationId}: {Errors}",
                userId, convId, string.Join(", ", ex.Errors));
            throw new HubException(string.Join(" ", ex.Errors));
        }
        catch (QuotaExceededException ex)
        {
            _logger.LogWarning("Quota exceeded for user {UserId}: {Message}", userId, ex.Message);
            throw new HubException(ex.Message);
        }
        catch (AiServiceException ex)
        {
            _logger.LogError(ex, "AI service error for user {UserId} in conversation {ConversationId}",
                userId, convId);
            throw new HubException(ex.Message);
        }
    }
}