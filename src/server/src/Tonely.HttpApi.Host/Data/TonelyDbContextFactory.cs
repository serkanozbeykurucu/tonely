using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Tonely.DataAccess.Context;

namespace Tonely.HttpApi.Host.Data;

public class TonelyDbContextFactory : IDesignTimeDbContextFactory<TonelyDbContext>
{
    public TonelyDbContext CreateDbContext(string[] args)
    {
        var host = Environment.GetEnvironmentVariable("DB_HOST") ?? "localhost";
        var port = Environment.GetEnvironmentVariable("DB_PORT") ?? "5432";
        var name = Environment.GetEnvironmentVariable("DB_NAME") ?? "TonelyDb";
        var user = Environment.GetEnvironmentVariable("DB_USER") ?? "postgres";
        var pass = Environment.GetEnvironmentVariable("DB_PASSWORD") ?? "postgres";

        var connectionString = $"Host={host};Port={port};Database={name};Username={user};Password={pass}";

        var options = new DbContextOptionsBuilder<TonelyDbContext>()
            .UseNpgsql(connectionString)
            .Options;

        return new TonelyDbContext(options);
    }
}