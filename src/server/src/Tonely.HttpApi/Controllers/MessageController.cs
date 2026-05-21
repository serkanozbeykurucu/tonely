using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Tonely.Business.Abstract;
using Tonely.Shared.Responses.Abstract;

namespace Tonely.HttpApi.Controllers;

[Authorize]
[ApiController]
[Route("api/v{version:apiVersion}/[controller]")]
public class MessageController : ControllerBase
{
    private readonly IMessageService _service;

    public MessageController(IMessageService service)
    {
        _service = service;
    }

    [HttpGet("conversation/{conversationId:guid}")]
    public async Task<IServiceResponse> GetByConversation(Guid conversationId)
    {
        return await _service.GetByConversationAsync(conversationId);
    }
}