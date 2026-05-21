using Anthropic;
using Microsoft.Extensions.AI;

namespace Tonely.HttpApi.Host.Data.Factories;

internal sealed class ClaudeChatClientFactory : IChatClientFactory
{
    public IChatClient Create(string apiKey, string model) =>
        new AnthropicClient(new Anthropic.Core.ClientOptions { ApiKey = apiKey }).AsIChatClient(model);
}