using Tonely.Entity.Concrete;

namespace Tonely.DataAccess.Abstract;

public interface IMessageDal : IGenericDal<Message>
{
    Task<int> CountConversationsWithAssistantAsync(string userId, Guid excludeConversationId);
}