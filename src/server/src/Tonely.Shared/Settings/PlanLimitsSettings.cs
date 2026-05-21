using Tonely.Shared.Constants;

namespace Tonely.Shared.Settings;

public class PlanLimit
{
    public int MaxConversations { get; set; } = 1;
    public int RateLimitPerMinute { get; set; } = 5;
}

public class PlanLimitsSettings
{
    public Dictionary<string, PlanLimit> Plans { get; set; } = [];

    public PlanLimit GetForRole(string role) => Plans.TryGetValue(role, out var limit) ? limit : Plans.GetValueOrDefault(RoleConstants.Free) ?? new PlanLimit();
}