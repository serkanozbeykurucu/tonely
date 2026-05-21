using AutoMapper;
using FluentValidation;
using Microsoft.Extensions.Logging;
using Tonely.Business.Abstract;
using Tonely.DataAccess.Abstract;
using Tonely.Dto;
using Tonely.Entity.Concrete;
using Tonely.Shared.Exceptions;
using Tonely.Shared.Responses.Abstract;
using Tonely.Shared.Responses.ComplexTypes;
using Tonely.Shared.Responses.Concrete;
using Tonely.Shared.Utilities;

namespace Tonely.Business.Concrete;

public class ConversationService : IConversationService
{
    private readonly IConversationDal _conversationDal;
    private readonly IMapper _mapper;
    private readonly IValidator<CreateConversationRequest> _validator;
    private readonly ILogger<ConversationService> _logger;
    private readonly UserUtility _userUtility;

    public ConversationService(
        IConversationDal conversationDal,
        IMapper mapper,
        IValidator<CreateConversationRequest> validator,
        ILogger<ConversationService> logger,
        UserUtility userUtility)
    {
        _conversationDal = conversationDal;
        _mapper = mapper;
        _validator = validator;
        _logger = logger;
        _userUtility = userUtility;
    }

    public async Task<IServiceResponse> GetAllAsync()
    {
        var userId = _userUtility.GetUserId();
        if (string.IsNullOrEmpty(userId))
        {
            return new Response(ResponseCode.Unauthorized);
        }

        var conversations = await _conversationDal.GetListAsync(c => c.UserId == userId);
        var dtos = _mapper.Map<List<ConversationDto>>(conversations);
        return new Response<List<ConversationDto>>(ResponseCode.Success, dtos);
    }

    public async Task<IServiceResponse> GetByIdAsync(Guid id)
    {
        var userId = _userUtility.GetUserId();
        if (string.IsNullOrEmpty(userId))
        {
            return new Response(ResponseCode.Unauthorized);
        }

        var conversation = await _conversationDal.GetAsync(c => c.Id == id && c.UserId == userId);
        if (conversation == null)
        {
            throw new NotFoundException(nameof(Conversation), id);
        }

        var dto = _mapper.Map<ConversationDto>(conversation);
        return new Response<ConversationDto>(ResponseCode.Success, dto);
    }

    public async Task<IServiceResponse> CreateAsync(CreateConversationRequest request)
    {
        var userId = _userUtility.GetUserId();
        if (string.IsNullOrEmpty(userId))
        {
            return new Response(ResponseCode.Unauthorized);
        }

        var validationResult = await _validator.ValidateAsync(request);
        if (!validationResult.IsValid)
            throw new Shared.Exceptions.ValidationException(validationResult.Errors.Select(e => e.ErrorMessage).ToList());

        var conversation = new Conversation
        {
            Title = request.Title,
            UserId = userId
        };

        await _conversationDal.AddAsync(conversation);
        _logger.LogInformation("Conversation {Id} created for user {UserId}", conversation.Id, userId);

        var dto = _mapper.Map<ConversationDto>(conversation);
        return new Response<ConversationDto>(ResponseCode.Success, dto);
    }

    public async Task<IServiceResponse> DeleteAsync(Guid id)
    {
        var userId = _userUtility.GetUserId();
        if (string.IsNullOrEmpty(userId))
        {
            return new Response(ResponseCode.Unauthorized);
        }

        var conversation = await _conversationDal.GetAsync(c => c.Id == id && c.UserId == userId);
        if (conversation == null)
        {
            throw new NotFoundException(nameof(Conversation), id);
        }

        await _conversationDal.DeleteAsync(conversation);
        return new Response(ResponseCode.NoContent);
    }
}