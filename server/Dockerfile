FROM microsoft/dotnet:2.1-sdk-alpine AS build
WORKDIR /app

# copy csproj and restore as distinct layers
COPY *.csproj .
RUN dotnet restore \
    --source https://api.nuget.org/v3/index.json \
    --source https://dotnet.myget.org/F/aspnetcore-dev/api/v3/index.json \
    --source https://dotnet.myget.org/F/aspnetcore-ci-dev/api/v3/index.json \
    --source https://www.myget.org/F/sixlabors/api/v3/index.json

# copy everything else and build app
COPY . .
WORKDIR /app/
RUN dotnet build

FROM build AS publish
WORKDIR /app
RUN dotnet publish -c Release -o out


FROM fergalmoran/podnoms.alpine.base AS runtime
COPY --from=publish /app/out ./

ENTRYPOINT ["dotnet", "PodNoms.Api.dll"]
