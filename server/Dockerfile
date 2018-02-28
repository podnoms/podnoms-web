FROM microsoft/dotnet-nightly:2.1-sdk AS build-env
WORKDIR /app

COPY *.csproj ./
COPY NuGet.config ./
RUN dotnet restore

COPY . ./
RUN dotnet publish -c Release -o out

FROM microsoft/dotnet-nightly:2.1-runtime-alpine
WORKDIR /app

RUN apk add --update \
    python \
    ffmpeg \
    curl && \
    curl -L https://yt-dl.org/downloads/latest/youtube-dl -o /usr/local/bin/youtube-dl && \
    chmod a+rx /usr/local/bin/youtube-dl

COPY --from=build-env /app/out .
ENTRYPOINT ["dotnet", "PodNoms.Api.dll"]