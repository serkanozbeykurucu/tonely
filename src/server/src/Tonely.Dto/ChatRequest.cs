namespace Tonely.Dto;

public class ChatRequest
{
    public Guid ConversationId { get; set; }
    public string Content { get; set; } = string.Empty;
}