FROM microsoft/dotnet-nightly:2.1-sdk AS build-env
WORKDIR /app

COPY *.csproj ./
COPY NuGet.config ./
RUN dotnet restore

COPY . ./
RUN dotnet build -c Release -o /out -r alpine.3.6-x64
RUN dotnet publish -c Release -o /out -r alpine.3.6-x64

FROM microsoft/dotnet-nightly:2.1-runtime-alpine
WORKDIR /app

RUN apk add --no-cache --update \
    python \
    ffmpeg \
    libuv \
    curl && \
    ln -s /usr/lib/libuv.so.1 /usr/lib/libuv.so && \
    curl -L https://yt-dl.org/downloads/latest/youtube-dl -o /usr/local/bin/youtube-dl && \
    chmod a+rx /usr/local/bin/youtube-dl && \
    youtube-dl -U

COPY --from=build-env /out .
ENTRYPOINT ["dotnet", "PodNoms.Api.dll"]
