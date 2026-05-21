namespace Tonely.Entity.Concrete;

public class Conversation : BaseEntity
{
    public string Title { get; set; } = string.Empty;
    public string UserId { get; set; } = string.Empty;
    public ICollection<Message> Messages { get; set; } = new List<Message>();
}