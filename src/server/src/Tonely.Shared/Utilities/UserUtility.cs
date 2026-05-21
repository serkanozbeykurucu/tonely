using System.Security.Claims;
using Microsoft.AspNetCore.Http;

namespace Tonely.Shared.Utilities;

public class UserUtility
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public UserUtility(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    public string GetUserId()
    {
        return _httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier) ?? string.Empty;
    }

    public string GetUserEmail()
    {
        return _httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.Email) ?? string.Empty;
    }

    public string GetUserName()
    {
        var fullName = _httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.GivenName) ?? string.Empty;
        if (string.IsNullOrWhiteSpace(fullName)) return string.Empty;
        return fullName.Split(' ', StringSplitOptions.RemoveEmptyEntries)[0];
    }

    public string GetUserRole()
    {
        return _httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.Role) ?? string.Empty;
    }

    public bool IsAuthenticated()
    {
        return _httpContextAccessor.HttpContext?.User.Identity?.IsAuthenticated == true;
    }
}