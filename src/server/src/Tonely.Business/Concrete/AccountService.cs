using FluentValidation;
using Microsoft.AspNetCore.Identity;
using Tonely.Business.Abstract;
using Tonely.Shared.Utilities;
using Tonely.Entity.Concrete;
using Tonely.Dto;
using Tonely.Shared.Constants;
using Tonely.Shared.Responses.Abstract;
using Tonely.Shared.Responses.ComplexTypes;
using Tonely.Shared.Responses.Concrete;

namespace Tonely.Business.Concrete;

public class AccountService : IAccountService
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IValidator<RegisterWithNameRequest> _registerValidator;
    private readonly IValidator<UpdateProfileRequest> _updateProfileValidator;
    private readonly UserUtility _userUtility;

    public AccountService(
        UserManager<ApplicationUser> userManager,
        IValidator<RegisterWithNameRequest> registerValidator,
        IValidator<UpdateProfileRequest> updateProfileValidator,
        UserUtility userUtility)
    {
        _userManager = userManager;
        _registerValidator = registerValidator;
        _updateProfileValidator = updateProfileValidator;
        _userUtility = userUtility;
    }

    public async Task<IServiceResponse> RegisterAsync(RegisterWithNameRequest request)
    {
        var validationResult = await _registerValidator.ValidateAsync(request);
        if (!validationResult.IsValid)
            throw new Shared.Exceptions.ValidationException(validationResult.Errors.Select(e => e.ErrorMessage).ToList());

        var user = new ApplicationUser
        {
            UserName = request.Email,
            Email = request.Email,
            FullName = request.FullName.Trim()
        };

        var result = await _userManager.CreateAsync(user, request.Password);
        if (!result.Succeeded)
        {
            var errors = result.Errors.Select(e => e.Description).ToList();
            throw new Shared.Exceptions.ValidationException(errors);
        }

        await _userManager.AddToRoleAsync(user, RoleConstants.Free);

        return new Response(ResponseCode.Success, "Registration successful.");
    }

    public async Task<IServiceResponse> GetProfileAsync()
    {
        var userId = _userUtility.GetUserId();
        if (string.IsNullOrEmpty(userId))
        {
            return new Response(ResponseCode.Unauthorized, "Unauthorized");
        }

        var user = await _userManager.FindByIdAsync(userId);
        if (user == null)
        {
            return new Response<AccountProfileDto>(ResponseCode.NotFound, "User not found.");
        }

        var profileDto = new AccountProfileDto
        {
            FullName = user.FullName ?? string.Empty,
            Email = user.Email ?? string.Empty
        };

        return new Response<AccountProfileDto>(ResponseCode.Success, profileDto, "Profile retrieved successfully.");
    }

    public async Task<IServiceResponse> UpdateProfileAsync(UpdateProfileRequest request)
    {
        var validationResult = await _updateProfileValidator.ValidateAsync(request);
        if (!validationResult.IsValid)
        {
            throw new Shared.Exceptions.ValidationException(validationResult.Errors.Select(e => e.ErrorMessage).ToList());
        }
        
        var userId = _userUtility.GetUserId();
        if (string.IsNullOrEmpty(userId))
        {
            return new Response(ResponseCode.Unauthorized, "Unauthorized");
        }

        var user = await _userManager.FindByIdAsync(userId);
        if (user == null)
        {
            return new Response(ResponseCode.NotFound, "User not found.");
        }

        user.FullName = request.FullName?.Trim() ?? string.Empty;
        var result = await _userManager.UpdateAsync(user);

        if (!result.Succeeded)
        {
            return new Response(ResponseCode.Fail, "Failed to update profile.");
        }

        return new Response(ResponseCode.Success, "Profile updated successfully.");
    }
}