FROM microsoft/aspnetcore:latest
WORKDIR /app
COPY out .
RUN apt-get update
RUN apt-get -y install youtube-dl

ENV ASPNETCORE_URLS http://*:5000
EXPOSE 5000

ENTRYPOINT ["dotnet", "PodNoms.Api.dll"]
