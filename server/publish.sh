#!/bin/bash
unset DOCKER_HOST
unset DOCKER_TLS_VERIFY
export ASPNETCORE_ENVIRONMENT=Production
dotnet build -c Release
dotnet ef database update
dotnet publish -c Release -o out
docker build -t fergalmoran/podnoms.api .

docker push fergalmoran/podnoms.api

