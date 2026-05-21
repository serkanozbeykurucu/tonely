namespace Tonely.Shared.Exceptions;

public abstract class BaseException : Exception
{
    public int StatusCode { get; }
    protected BaseException(string message, int statusCode) : base(message) { StatusCode = statusCode; }
}

public class NotFoundException : BaseException
{
    public NotFoundException(string entity, object id) : base($"{entity} with id '{id}' was not found.", 404) { }
}

public class ValidationException : BaseException
{
    public List<string> Errors { get; }
    public ValidationException(List<string> errors) : base("Validation failed.", 400) { Errors = errors; }
}

public class UnauthorizedException : BaseException
{
    public UnauthorizedException(string message = "Unauthorized.") : base(message, 401) { }
}

public class ForbiddenException : BaseException
{
    public ForbiddenException(string message = "Access denied.") : base(message, 403) { }
}

public class BusinessRuleException : BaseException
{
    public BusinessRuleException(string message) : base(message, 422) { }
}

public class QuotaExceededException : BaseException
{
    public QuotaExceededException(string message = "Quota exceeded.") : base(message, 429) { }
}

public class AiServiceException : BaseException
{
    public AiServiceException(string message) : base(message, 502) { }
}