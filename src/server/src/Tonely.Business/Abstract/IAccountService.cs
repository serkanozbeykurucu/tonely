using Tonely.Dto;
using Tonely.Shared.Responses.Abstract;

namespace Tonely.Business.Abstract;

public interface IAccountService
{
    Task<IServiceResponse> RegisterAsync(RegisterWithNameRequest request);
    Task<IServiceResponse> GetProfileAsync();
    Task<IServiceResponse> UpdateProfileAsync(UpdateProfileRequest request);
}