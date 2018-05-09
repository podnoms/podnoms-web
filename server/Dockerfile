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


FROM microsoft/dotnet:2.1-aspnetcore-runtime-alpine AS runtime
WORKDIR /app
COPY --from=publish /app/out ./
# ln -s /usr/lib/libuv.so.1 /usr/lib/libuv.so && \

RUN apk add --no-cache --update \
    python \
    ffmpeg \
    libuv \
    curl \
    curl-dev && \
    curl -L https://yt-dl.org/downloads/latest/youtube-dl -o /usr/local/bin/youtube-dl && \
    chmod a+rx /usr/local/bin/youtube-dl && \
    youtube-dl -U

ENTRYPOINT ["dotnet", "PodNoms.Api.dll"]
