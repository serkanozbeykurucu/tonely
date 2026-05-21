using Microsoft.EntityFrameworkCore;
using Tonely.DataAccess.Abstract;
using Tonely.DataAccess.Context;
using Tonely.Entity.Concrete;
using Tonely.Entity.Enums;

namespace Tonely.DataAccess.Concrete.EntityFramework;

public class EfMessageDal : GenericRepository<Message>, IMessageDal
{
    public EfMessageDal(TonelyDbContext context) : base(context) { }

    public async Task<int> CountConversationsWithAssistantAsync(string userId, Guid excludeConversationId)
        => await _dbSet
            .Where(m => m.Conversation.UserId == userId
                     && m.Role == MessageRole.Assistant
                     && m.ConversationId != excludeConversationId)
            .Select(m => m.ConversationId)
            .Distinct()
            .CountAsync();
}