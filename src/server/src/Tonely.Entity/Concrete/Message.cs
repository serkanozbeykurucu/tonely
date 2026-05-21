using Tonely.Entity.Enums;

namespace Tonely.Entity.Concrete;

public class Message : BaseEntity
{
    public Guid ConversationId { get; set; }
    public MessageRole Role { get; set; }
    public string Content { get; set; } = string.Empty;
    public Conversation Conversation { get; set; } = null!;
}