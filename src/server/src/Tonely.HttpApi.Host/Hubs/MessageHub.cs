using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System.Security.Claims;
using Tonely.Business.Abstract;
using Tonely.Dto;
using Tonely.Shared.Exceptions;

namespace Tonely.HttpApi.Host.Hubs;

[Authorize(AuthenticationSchemes = "Identity.Bearer")]
public class MessageHub : Hub
{
    private readonly IMessageService _messageService;

    public MessageHub(IMessageService messageService)
    {
        _messageService = messageService;
    }

    public async Task SendMessage(string conversationId, string content)
    {
        if (!Guid.TryParse(conversationId, out var convId))
        {
            throw new HubException("Invalid conversation ID.");
        }
        
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
            throw new HubException(ex.Message);
        }
        catch (ValidationException ex)
        {
            throw new HubException(string.Join(" ", ex.Errors));
        }
        catch (QuotaExceededException ex)
        {
            throw new HubException(ex.Message);
        }
        catch (AiServiceException ex)
        {
            throw new HubException(ex.Message);
        }
    }
}