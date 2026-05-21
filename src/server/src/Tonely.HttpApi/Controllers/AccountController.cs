using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Tonely.Business.Abstract;
using Tonely.Dto;
using Tonely.Shared.Responses.Abstract;

namespace Tonely.HttpApi.Controllers;

[AllowAnonymous]
[ApiController]
[Route("api/v{version:apiVersion}/[controller]")]
public class AccountController : ControllerBase
{
    private readonly IAccountService _service;

    public AccountController(IAccountService service)
    {
        _service = service;
    }

    [HttpPost("register")]
    public async Task<IServiceResponse> Register([FromBody] RegisterWithNameRequest request)
    {
        return await _service.RegisterAsync(request);
    }

    [Authorize]
    [HttpGet("profile")]
    public async Task<IServiceResponse> GetProfile()
    {
        return await _service.GetProfileAsync();
    }

    [Authorize]
    [HttpPut("profile")]
    public async Task<IServiceResponse> UpdateProfile([FromBody] UpdateProfileRequest request)
    {
        return await _service.UpdateProfileAsync(request);
    }
}