using FluentValidation;
using Tonely.Dto;

namespace Tonely.Business.Validators;

public class ChatRequestValidator : AbstractValidator<ChatRequest>
{
    public ChatRequestValidator()
    {
        RuleFor(x => x.ConversationId)
            .NotEmpty().WithMessage("Conversation ID is required.");

        RuleFor(x => x.Content)
            .NotEmpty().WithMessage("Message content is required.")
            .MaximumLength(4000).WithMessage("Message content must not exceed 4000 characters.")
            .Must(ContentGuard.IsSafe).WithMessage("Your message contains content that is not allowed. Tonely is designed to help you write recruiter outreach messages.");
    }
}