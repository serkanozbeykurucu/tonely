using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Tonely.Business.Abstract;
using Tonely.Dto;
using Tonely.Shared.Responses.Abstract;

namespace Tonely.HttpApi.Controllers;

[Authorize]
[ApiController]
[ApiVersion("1.0")]
[Route("api/v{version:apiVersion}/[controller]")]
public class ConversationController : ControllerBase
{
    private readonly IConversationService _service;

    public ConversationController(IConversationService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IServiceResponse> GetAll()
    {
        return await _service.GetAllAsync();
    }

    [HttpGet("{id:guid}")]
    public async Task<IServiceResponse> GetById(Guid id)
    {
        return await _service.GetByIdAsync(id);
    }

    [HttpPost]
    public async Task<IServiceResponse> Create([FromBody] CreateConversationRequest request)
    {
        return await _service.CreateAsync(request);
    }

    [HttpDelete("{id:guid}")]
    public async Task<IServiceResponse> Delete(Guid id)
    {
        return await _service.DeleteAsync(id);
    }
}