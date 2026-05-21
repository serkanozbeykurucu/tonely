FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

COPY Tonely.slnx ./
COPY src/Tonely.Entity/Tonely.Entity.csproj             src/Tonely.Entity/
COPY src/Tonely.DataAccess/Tonely.DataAccess.csproj     src/Tonely.DataAccess/
COPY src/Tonely.Dto/Tonely.Dto.csproj                   src/Tonely.Dto/
COPY src/Tonely.Shared/Tonely.Shared.csproj             src/Tonely.Shared/
COPY src/Tonely.Business/Tonely.Business.csproj         src/Tonely.Business/
COPY src/Tonely.HttpApi/Tonely.HttpApi.csproj           src/Tonely.HttpApi/
COPY src/Tonely.HttpApi.Host/Tonely.HttpApi.Host.csproj src/Tonely.HttpApi.Host/

RUN dotnet restore src/Tonely.HttpApi.Host/Tonely.HttpApi.Host.csproj

COPY src/ ./src/

RUN dotnet publish src/Tonely.HttpApi.Host/Tonely.HttpApi.Host.csproj \
    --configuration Release \
    --output /app/publish \
    --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime
WORKDIR /app

COPY --from=build --chown=app:app /app/publish .

RUN mkdir -p logs && chown app:app logs

USER app

ENV ASPNETCORE_HTTP_PORTS=10000
EXPOSE 10000

ENTRYPOINT ["dotnet", "Tonely.HttpApi.Host.dll"]
