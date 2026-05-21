using Tonely.Shared.Responses.ComplexTypes;

namespace Tonely.Shared.Responses.Abstract;

public interface IServiceResponse
{
    ResponseCode ResponseCode { get; }
    string Message { get; }
}