namespace Tonely.Shared.Responses.ComplexTypes;

public enum ResponseCode
{
    Success = 200,
    NoContent = 204,
    BadRequest = 400,
    Unauthorized = 401,
    Forbidden = 403,
    NotFound = 404,
    TooManyRequests = 429,
    Fail = 500,
}