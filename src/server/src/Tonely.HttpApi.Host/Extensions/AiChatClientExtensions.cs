using Microsoft.Extensions.AI;
using Tonely.HttpApi.Host.Data;
using Tonely.HttpApi.Host.Data.Factories;

namespace Tonely.HttpApi.Host.Extensions;

public static class AiChatClientExtensions
{
    public static IServiceCollection AddAiChatClient(this IServiceCollection services)
    {
        var provider = (Environment.GetEnvironmentVariable("AI_PROVIDER") ?? "gemini").ToLowerInvariant();
        var model = Environment.GetEnvironmentVariable("AI_MODEL") ?? "gemini-2.0-flash";
        var apiKeys = (Environment.GetEnvironmentVariable("AI_API_KEY") ?? string.Empty)
            .Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
            .Where(k => k != "your_gemini_api_key_here" && k != "your_ai_api_key_here")
            .ToList();

        if (apiKeys.Count == 0)
        {
            services.AddSingleton<IChatClient, NoOpChatClient>();
            return services;
        }

        IChatClientFactory factory = provider switch
        {
            "openai" => new OpenAiChatClientFactory(),
            "claude" => new ClaudeChatClientFactory(),
            "deepseek" => new DeepSeekChatClientFactory(),
            _ => new GeminiChatClientFactory()
        };

        var clients = apiKeys.Select(key => factory.Create(key, model)).ToList();

        services.AddSingleton<IChatClient>(sp =>
        {
            if (clients.Count == 1)
            {
                return clients[0];
            }
            
            var logger = sp.GetRequiredService<ILogger<FallbackChatClient>>();
            return new FallbackChatClient(clients, logger);
        });

        return services;
    }
}