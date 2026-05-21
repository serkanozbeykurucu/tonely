using System.Text.RegularExpressions;

namespace Tonely.Business.Validators;

internal static class ContentGuard
{
    private static readonly Regex[] _forbiddenPatterns =
    [
        // Prompt injection — override system instructions
        new(@"\bignore\s+(previous|above|all|your)\s+instructions?\b", RegexOptions.IgnoreCase | RegexOptions.Compiled),
        new(@"\bforget\s+(your\s+instructions?|all\s+instructions?|the\s+system\s+prompt|previous\s+instructions?)\b", RegexOptions.IgnoreCase | RegexOptions.Compiled),
        new(@"\bdisregard\s+(all|previous|your)\s+(instructions?|rules?|guidelines?)\b", RegexOptions.IgnoreCase | RegexOptions.Compiled),
        new(@"\bnew\s+instructions?\s*:", RegexOptions.IgnoreCase | RegexOptions.Compiled),
        new(@"\bsystem\s+prompt\b", RegexOptions.IgnoreCase | RegexOptions.Compiled),
        new(@"\bjailbreak\b", RegexOptions.IgnoreCase | RegexOptions.Compiled),
        new(@"\bDAN\s+mode\b", RegexOptions.IgnoreCase | RegexOptions.Compiled),
        new(@"\bpretend\s+you\s+(are|have\s+no)\b", RegexOptions.IgnoreCase | RegexOptions.Compiled),

        // SQL injection syntax
        new(@"('|;)\s*(DROP|DELETE|INSERT|UPDATE|UNION)\s+", RegexOptions.IgnoreCase | RegexOptions.Compiled),
        new(@"\bUNION\s+(ALL\s+)?SELECT\b", RegexOptions.IgnoreCase | RegexOptions.Compiled),

        // Script / XSS injection
        new(@"<script[\s>]", RegexOptions.IgnoreCase | RegexOptions.Compiled),
        new(@"\bjavascript\s*:", RegexOptions.IgnoreCase | RegexOptions.Compiled),
        new(@"\bon\w+\s*=\s*[""']", RegexOptions.IgnoreCase | RegexOptions.Compiled),
    ];

    internal static bool IsSafe(string content) => !_forbiddenPatterns.Any(p => p.IsMatch(content));
}