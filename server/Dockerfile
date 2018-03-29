FROM microsoft/aspnetcore-build:2.1.300-preview1-stretch AS build-env
WORKDIR /app

# Copy csproj and restore as distinct layers
COPY *.csproj ./
RUN dotnet restore

# Copy everything else and build
COPY . ./
RUN dotnet publish -c Release -o out

# Build runtime image
FROM microsoft/aspnetcore:2.1.0-preview1-stretch-slim
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
