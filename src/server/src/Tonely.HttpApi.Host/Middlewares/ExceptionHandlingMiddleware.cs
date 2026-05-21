using System.Security.Claims;
using Tonely.Shared.Exceptions;
using Tonely.Shared.Responses.Concrete;
using Tonely.Shared.Responses.ComplexTypes;

namespace Tonely.HttpApi.Host.Middlewares;

public class ExceptionHandlingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionHandlingMiddleware> _logger;

    public ExceptionHandlingMiddleware(RequestDelegate next, ILogger<ExceptionHandlingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (BaseException ex)
        {
            var userId = context.User?.FindFirstValue(ClaimTypes.NameIdentifier) ?? "anonymous";
            var method = context.Request.Method;
            var path = context.Request.Path;

            _logger.LogWarning(ex,
                "Handled exception on {Method} {Path} for user {UserId}: {Message}",
                method, path, userId, ex.Message);

            context.Response.StatusCode = ex.StatusCode;
            context.Response.ContentType = "application/json";

            if (ex is ValidationException validationEx)
                await context.Response.WriteAsJsonAsync(new Response(ResponseCode.BadRequest, string.Join("; ", validationEx.Errors)));
            else
            {
                var code = Enum.IsDefined(typeof(ResponseCode), ex.StatusCode) ? (ResponseCode)ex.StatusCode : ResponseCode.Fail;
                await context.Response.WriteAsJsonAsync(new Response(code, ex.Message));
            }
        }
        catch (Exception ex)
        {
            var userId = context.User?.FindFirstValue(ClaimTypes.NameIdentifier) ?? "anonymous";
            var method = context.Request.Method;
            var path = context.Request.Path;

            _logger.LogError(ex,
                "Unhandled exception on {Method} {Path} for user {UserId}",
                method, path, userId);

            context.Response.StatusCode = 500;
            context.Response.ContentType = "application/json";
            await context.Response.WriteAsJsonAsync(new Response(ResponseCode.Fail, "An unexpected error occurred."));
        }
    }
}