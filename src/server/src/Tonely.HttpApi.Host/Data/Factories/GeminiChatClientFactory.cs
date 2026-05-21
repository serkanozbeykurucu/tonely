using Microsoft.Extensions.AI;
using Mscc.GenerativeAI.Microsoft;

namespace Tonely.HttpApi.Host.Data.Factories;

internal sealed class GeminiChatClientFactory : IChatClientFactory
{
    public IChatClient Create(string apiKey, string model) =>
        new GeminiChatClient(apiKey: apiKey, model: model, logger: null);
}