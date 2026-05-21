using Microsoft.Extensions.AI;

namespace Tonely.HttpApi.Host.Data.Factories;

internal interface IChatClientFactory
{
    IChatClient Create(string apiKey, string model);
}