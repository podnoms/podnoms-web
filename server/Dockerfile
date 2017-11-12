FROM microsoft/aspnetcore-build:2.0 AS build-env
WORKDIR /app

# Copy csproj and restore as distinct layers
COPY *.csproj ./
COPY NuGet.config ./
RUN dotnet restore

# Copy everything else and build
COPY . ./
RUN dotnet publish -c Release -o out

# Build runtime image
FROM fergalmoran/aspnetcore-podnoms
WORKDIR /app

COPY --from=build-env /app/out .
ENTRYPOINT ["dotnet", "PodNoms.Api.dll"]
