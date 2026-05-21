using Microsoft.Extensions.AI;
using OpenAI.Chat;

namespace Tonely.HttpApi.Host.Data.Factories;

internal sealed class OpenAiChatClientFactory : IChatClientFactory
{
    public IChatClient Create(string apiKey, string model) =>
        new ChatClient(model: model, apiKey: apiKey).AsIChatClient();
}