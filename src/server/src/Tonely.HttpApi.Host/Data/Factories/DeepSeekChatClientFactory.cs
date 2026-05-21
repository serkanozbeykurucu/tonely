using Microsoft.Extensions.AI;
using OpenAI;
using OpenAI.Chat;
using System.ClientModel;

namespace Tonely.HttpApi.Host.Data.Factories;

internal sealed class DeepSeekChatClientFactory : IChatClientFactory
{
    private static readonly Uri Endpoint = new("https://api.deepseek.com/v1");

    public IChatClient Create(string apiKey, string model) =>
        new ChatClient(
            model: model,
            credential: new ApiKeyCredential(apiKey),
            options: new OpenAIClientOptions { Endpoint = Endpoint }
        ).AsIChatClient();
}