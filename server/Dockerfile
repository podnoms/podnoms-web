FROM microsoft/dotnet:2.1-sdk as build-env
# FROM microsoft/aspnetcore-build:2.1.300-preview2-stretch AS build-env
WORKDIR /app

# Copy csproj and restore as distinct layers
COPY *.csproj ./
COPY NuGet.config ./
RUN dotnet restore \
    --source https://api.nuget.org/v3/index.json \
    --source https://dotnet.myget.org/F/aspnetcore-dev/api/v3/index.json \
    --source https://dotnet.myget.org/F/aspnetcore-ci-dev/api/v3/index.json \
    --source https://www.myget.org/F/sixlabors/api/v3/index.json 

# Copy everything else and build
COPY . ./
RUN dotnet publish -c Release -o out

# Build runtime image
FROM microsoft/dotnet:2.1-aspnetcore-runtime
WORKDIR /app
COPY --from=build-env /app/out .

RUN apt-get update && apt-get install -y \
    python \
    ffmpeg \
    curl && \
    curl -L https://yt-dl.org/downloads/latest/youtube-dl -o /usr/local/bin/youtube-dl && \
    chmod a+rx /usr/local/bin/youtube-dl && \
    youtube-dl -U

ENTRYPOINT ["dotnet", "PodNoms.Api.dll"]
