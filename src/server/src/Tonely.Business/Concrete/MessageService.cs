using AutoMapper;
using FluentValidation;
using Microsoft.Extensions.Logging;
using System.Text;
using Tonely.Business.Abstract;
using Tonely.Shared.Utilities;
using Tonely.DataAccess.Abstract;
using Tonely.Dto;
using Tonely.Entity.Concrete;
using Tonely.Entity.Enums;
using Tonely.Shared.Exceptions;
using Tonely.Shared.Responses.Abstract;
using Tonely.Shared.Responses.ComplexTypes;
using Tonely.Shared.Responses.Concrete;

namespace Tonely.Business.Concrete;

public class MessageService : IMessageService
{
    private readonly IMessageDal _messageDal;
    private readonly IConversationDal _conversationDal;
    private readonly IAiMessageService _aiService;
    private readonly IUsageLimitService _usageLimitService;
    private readonly IMapper _mapper;
    private readonly IValidator<ChatRequest> _chatValidator;
    private readonly ILogger<MessageService> _logger;
    private readonly UserUtility _userUtility;

    public MessageService(
        IMessageDal messageDal,
        IConversationDal conversationDal,
        IAiMessageService aiService,
        IUsageLimitService usageLimitService,
        IMapper mapper,
        IValidator<ChatRequest> chatValidator,
        ILogger<MessageService> logger,
        UserUtility userUtility)
    {
        _messageDal = messageDal;
        _conversationDal = conversationDal;
        _aiService = aiService;
        _usageLimitService = usageLimitService;
        _mapper = mapper;
        _chatValidator = chatValidator;
        _logger = logger;
        _userUtility = userUtility;
    }

    public async Task<IServiceResponse> GetByConversationAsync(Guid conversationId)
    {
        var userId = _userUtility.GetUserId();
        if (string.IsNullOrEmpty(userId))
        {
            return new Response(ResponseCode.Unauthorized);
        }

        var conversation = await _conversationDal.GetAsync(c => c.Id == conversationId && c.UserId == userId);
        if (conversation == null)
        {
            throw new NotFoundException(nameof(Conversation), conversationId);
        }

        var messages = await _messageDal.GetListAsync(m => m.ConversationId == conversationId);
        var dtos = _mapper.Map<List<MessageDto>>(messages);
        return new Response<List<MessageDto>>(ResponseCode.Success, dtos);
    }

    public async Task ChatStreamAsync(
        ChatRequest request,
        Func<string, Task> onChunk,
        Func<MessageDto, Task> onComplete,
        CancellationToken cancellationToken = default)
    {
        var userId = _userUtility.GetUserId();
        if (string.IsNullOrEmpty(userId))
        {
            throw new UnauthorizedAccessException();
        }

        var userRole = _userUtility.GetUserRole();
        await _usageLimitService.EnsureAiMessageAllowedAsync(userId, userRole, request.ConversationId, cancellationToken);

        var userFirstName = _userUtility.GetUserName();

        var validationResult = await _chatValidator.ValidateAsync(request, cancellationToken);
        if (!validationResult.IsValid)
            throw new Shared.Exceptions.ValidationException(validationResult.Errors.Select(e => e.ErrorMessage).ToList());

        var conversation = await _conversationDal.GetAsync(c => c.Id == request.ConversationId && c.UserId == userId);
        if (conversation == null)
            throw new NotFoundException(nameof(Conversation), request.ConversationId);

        var userMessage = new Message
        {
            ConversationId = request.ConversationId,
            Role = MessageRole.User,
            Content = request.Content.Trim()
        };
        await _messageDal.AddAsync(userMessage);

        var history = await _messageDal.GetListAsync(
            m => m.ConversationId == request.ConversationId && m.Id != userMessage.Id);

        var sb = new StringBuilder();
        await foreach (var chunk in _aiService.ChatStreamingAsync(history, userMessage.Content, userFirstName, cancellationToken))
        {
            sb.Append(chunk);
            await onChunk(chunk);
        }

        var assistantMessage = new Message
        {
            ConversationId = request.ConversationId,
            Role = MessageRole.Assistant,
            Content = sb.ToString()
        };
        await _messageDal.AddAsync(assistantMessage);

        _logger.LogInformation("Chat stream completed for conversation {ConversationId}", request.ConversationId);

        var dto = _mapper.Map<MessageDto>(assistantMessage);
        await onComplete(dto);
    }
}