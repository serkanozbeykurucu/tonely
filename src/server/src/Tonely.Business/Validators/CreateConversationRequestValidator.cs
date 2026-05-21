using FluentValidation;
using Tonely.Dto;

namespace Tonely.Business.Validators;

public class CreateConversationRequestValidator : AbstractValidator<CreateConversationRequest>
{
    public CreateConversationRequestValidator()
    {
        RuleFor(x => x.Title)
            .NotEmpty().WithMessage("Conversation title is required.")
            .MaximumLength(500).WithMessage("Conversation title must not exceed 500 characters.");
    }
}