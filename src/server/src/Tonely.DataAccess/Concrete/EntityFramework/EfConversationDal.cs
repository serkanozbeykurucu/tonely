using Tonely.DataAccess.Abstract;
using Tonely.DataAccess.Context;
using Tonely.Entity.Concrete;

namespace Tonely.DataAccess.Concrete.EntityFramework;

public class EfConversationDal : GenericRepository<Conversation>, IConversationDal
{
    public EfConversationDal(TonelyDbContext context) : base(context) { }
}