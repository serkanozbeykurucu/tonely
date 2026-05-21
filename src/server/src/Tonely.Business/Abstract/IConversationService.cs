using Tonely.Dto;
using Tonely.Shared.Responses.Abstract;

namespace Tonely.Business.Abstract;

public interface IConversationService
{
    Task<IServiceResponse> GetAllAsync();
    Task<IServiceResponse> GetByIdAsync(Guid id);
    Task<IServiceResponse> CreateAsync(CreateConversationRequest request);
    Task<IServiceResponse> DeleteAsync(Guid id);
}