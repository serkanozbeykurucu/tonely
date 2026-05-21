using Tonely.Dto;
using Tonely.Shared.Responses.Abstract;

namespace Tonely.Business.Abstract;

public interface IMessageService
{
    Task<IServiceResponse> GetByConversationAsync(Guid conversationId);
    Task ChatStreamAsync(
        ChatRequest request,
        Func<string, Task> onChunk,
        Func<MessageDto, Task> onComplete,
        CancellationToken cancellationToken = default);
}