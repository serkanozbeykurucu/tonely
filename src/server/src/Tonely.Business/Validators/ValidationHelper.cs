namespace Tonely.Business.Validators;

public static class ValidationHelper
{
    public static readonly HashSet<string> BlockedDomains = new(StringComparer.OrdinalIgnoreCase)
    {
        "example.com", "example.org", "example.net", "example.edu", "example.gov", "example.co", "example.io",
        "test.com", "test.org", "test.net", "test.edu", "test.gov", "test.co", "test.io",
        "dummy.com", "dummy.org", "dummy.net", "dummy.edu", "dummy.gov", "dummy.co", "dummy.io",
        "invalid.com", "invalid.org", "invalid.net", "invalid.edu", "invalid.gov", "invalid.co", "invalid.io",
        "spam.com", "spam.org", "spam.net", "spam.edu", "spam.gov", "spam.co", "spam.io",
        "junk.com", "junk.org", "junk.net", "junk.edu", "junk.gov", "junk.co", "junk.io",
        "trash.com", "trash.org", "trash.net", "trash.edu", "trash.gov", "trash.co", "trash.io",

        "mailinator.com", "guerrillamail.com", "guerrillamail.net",
        "tempmail.com", "throwaway.email", "temp-mail.org",
        "fakeinbox.com", "sharklasers.com", "guerrillamailblock.com",
        "grr.la", "dispostable.com", "yopmail.com", "yopmail.fr",
        "trashmail.com", "trashmail.net", "trashmail.org",
        "mailnesia.com", "maildrop.cc", "discard.email",
        "tempail.com", "tempr.email", "10minutemail.com",
        "minutemail.com", "emailondeck.com", "getnada.com",
        "mohmal.com", "burnermail.io", "mailtemp.org",
        "fake-mail.net", "temp-mail.io", "temp-mail.com",
        "test@mail.com", "test@test.com", "test@gmail.com",
        "test@testmail.com", "test@test.com.tr"
    };

    public static bool NotBeBlockedDomain(string email)
    {
        if (string.IsNullOrWhiteSpace(email))
            return true;

        var atIndex = email.LastIndexOf('@');
        if (atIndex < 0)
            return true;

        var domain = email[(atIndex + 1)..];
        return !BlockedDomains.Contains(domain);
    }
}
