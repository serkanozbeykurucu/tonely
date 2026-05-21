using FluentValidation;
using Hangfire;
using Hangfire.PostgreSql;
using Microsoft.AspNetCore.Authentication.BearerToken;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Serilog;
using Serilog.Events;
using System.Text.Json;
using System.Text.Json.Serialization;
using Tonely.Business.Abstract;
using Tonely.Business.Concrete;
using Tonely.Business.Mappings;
using Tonely.Business.Validators;
using Tonely.Entity.Concrete;
using Tonely.DataAccess.Abstract;
using Tonely.Shared.Constants;
using Tonely.Shared.Settings;
using Tonely.DataAccess.Concrete.EntityFramework;
using Tonely.DataAccess.Context;
using Tonely.Dto;
using Tonely.HttpApi.Host.Extensions;
using Tonely.HttpApi.Host.Hubs;
using Tonely.HttpApi.Host.Identity;
using Tonely.HttpApi.Host.Middlewares;
using Tonely.Shared.Utilities;

static string? FindEnvFile()
{
    var dir = new DirectoryInfo(AppContext.BaseDirectory);
    while (dir != null)
    {
        var candidate = Path.Combine(dir.FullName, ".env");
        if (File.Exists(candidate)) return candidate;
        dir = dir.Parent;
    }
    return null;
}

var envFilePath = FindEnvFile();
if (envFilePath != null)
{
    foreach (var line in File.ReadAllLines(envFilePath))
    {
        if (string.IsNullOrWhiteSpace(line) || line.TrimStart().StartsWith('#')) continue;
        var parts = line.Split('=', 2);
        if (parts.Length == 2)
        {
            Environment.SetEnvironmentVariable(parts[0].Trim(), parts[1].Trim());
        }
    }
}

var builder = WebApplication.CreateBuilder(args);

builder.Configuration.AddEnvironmentVariables();

builder.Host.UseSerilog((context, config) =>
    config
        .MinimumLevel.Information()
        .MinimumLevel.Override("Microsoft", LogEventLevel.Warning)
        .MinimumLevel.Override("Microsoft.Hosting.Lifetime", LogEventLevel.Information)
        .MinimumLevel.Override("Microsoft.EntityFrameworkCore", LogEventLevel.Warning)
        .MinimumLevel.Override("Hangfire", LogEventLevel.Warning)
        .Enrich.FromLogContext()
        .WriteTo.Console(outputTemplate: "[{Timestamp:HH:mm:ss} {Level:u3}] {SourceContext}{NewLine}  {Message:lj}{NewLine}{Exception}")
        .WriteTo.File("logs/tonely-.txt",
            rollingInterval: RollingInterval.Day,
            retainedFileCountLimit: 30,
            outputTemplate: "[{Timestamp:yyyy-MM-dd HH:mm:ss.fff zzz}] [{Level:u3}] [{SourceContext}] {Message:lj}{NewLine}{Exception}"));

var connectionString = BuildConnectionString();

builder.Services.AddDbContext<TonelyDbContext>(options =>
    options.UseNpgsql(connectionString, o => o.EnableRetryOnFailure(3, TimeSpan.FromSeconds(10), null)));

builder.Services.AddIdentityApiEndpoints<ApplicationUser>(options =>
    {
        options.Password.RequireDigit = true;
        options.Password.RequiredLength = 8;
        options.Password.RequireNonAlphanumeric = false;
    })
    .AddRoles<ApplicationRole>()
    .AddEntityFrameworkStores<TonelyDbContext>()
    .AddClaimsPrincipalFactory<TonelyUserClaimsPrincipalFactory>();

builder.Services.PostConfigure<BearerTokenOptions>(IdentityConstants.BearerScheme, options =>
{
    var original = options.Events.OnMessageReceived;
    options.Events.OnMessageReceived = async context =>
    {
        await original(context);
        var token = context.Request.Query["access_token"];
        if (!string.IsNullOrEmpty(token) && context.HttpContext.Request.Path.StartsWithSegments("/hubs"))
            context.Token = token;
    };
});

builder.Services.AddAutoMapper(cfg => cfg.AddProfile<MappingProfile>());

builder.Services.AddScoped<IValidator<CreateConversationRequest>, CreateConversationRequestValidator>();
builder.Services.AddScoped<IValidator<ChatRequest>, ChatRequestValidator>();
builder.Services.AddScoped<IValidator<RegisterWithNameRequest>, RegisterWithNameRequestValidator>();
builder.Services.AddScoped<IValidator<UpdateProfileRequest>, UpdateProfileRequestValidator>();
builder.Services.Configure<PlanLimitsSettings>(builder.Configuration.GetSection("PlanLimits"));
builder.Services.AddSingleton<IRateLimiter, InMemoryRateLimiter>();
builder.Services.AddScoped<IUsageLimitService, UsageLimitService>();
builder.Services.AddScoped<IAccountService, AccountService>();

builder.Services.AddAiChatClient();

builder.Services.AddCors(options =>
{
    options.AddPolicy(PolicyConstants.CorsDefault, policy =>
        policy.WithOrigins(Env("CORS_ALLOWED_ORIGINS").Split(',', StringSplitOptions.RemoveEmptyEntries))
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials());
});

builder.Services.AddSignalR(options =>
{
    if (builder.Environment.IsDevelopment())
        options.EnableDetailedErrors = true;
});

builder.Services.AddHangfire(config => config
    .SetDataCompatibilityLevel(CompatibilityLevel.Version_180)
    .UseSimpleAssemblyNameTypeSerializer()
    .UseRecommendedSerializerSettings()
    .UsePostgreSqlStorage(c => c.UseNpgsqlConnection(connectionString)));
builder.Services.AddHangfireServer(options =>
{
    options.WorkerCount = 4;
    options.Queues = ["default"];
});

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
        options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
    });
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddMemoryCache();

builder.Services.AddApiVersioningConfig();
builder.Services.AddSwaggerConfig();

builder.Services.AddScoped<IConversationDal, EfConversationDal>();
builder.Services.AddScoped<IMessageDal, EfMessageDal>();

builder.Services.AddScoped<IConversationService, ConversationService>();
builder.Services.AddScoped<IMessageService, MessageService>();
builder.Services.AddScoped<IAiMessageService, AiMessageService>();

builder.Services.AddHttpContextAccessor();
builder.Services.AddScoped<UserUtility>();

var app = builder.Build();

app.UseMiddleware<ExceptionHandlingMiddleware>();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseHangfireDashboard("/hangfire");
}

app.UseHttpsRedirection();
app.UseCors(PolicyConstants.CorsDefault);
app.UseAuthentication();
app.UseAuthorization();

app.MapIdentityApi<ApplicationUser>();
app.MapControllers();
app.MapHub<MessageHub>("/hubs/messages");

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<TonelyDbContext>();
    await db.Database.MigrateAsync();

    var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<ApplicationRole>>();
    foreach (var role in new[] { RoleConstants.Free, RoleConstants.Pro })
    {
        if (!await roleManager.RoleExistsAsync(role))
        {
            await roleManager.CreateAsync(new ApplicationRole(role));
        }
    }
}

app.Run();

static string BuildConnectionString()
{
    var host = Environment.GetEnvironmentVariable("DB_HOST");
    if (!string.IsNullOrEmpty(host))
    {
        return $"Host={host};" +
               $"Port={Env("DB_PORT", "5432")};" +
               $"Database={Env("DB_NAME")};" +
               $"Username={Env("DB_USER")};" +
               $"Password={Env("DB_PASSWORD")};" +
               "SSL Mode=Require;" +
               "Trust Server Certificate=true;" +
               "Include Error Detail=true;" +
               "Maximum Pool Size=5;" +
               "Minimum Pool Size=0;" +
               "Connection Idle Lifetime=300;" +
               "Keepalive=30;" +
               "Timeout=30;";
    }

    throw new InvalidOperationException(
        "DB_HOST environment variable is required. Configure it in .env or as a system environment variable.");
}

static string Env(string key, string? defaultValue = null) =>
    Environment.GetEnvironmentVariable(key)
    ?? defaultValue
    ?? throw new InvalidOperationException($"Required env var missing: {key}");