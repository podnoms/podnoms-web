FROM microsoft/aspnetcore:latest
WORKDIR /app
COPY out .
RUN apt-get update && apt-get -y upgrade
# RUN pip install --upgrade youtube_dl
RUN curl -L https://yt-dl.org/downloads/latest/youtube-dl -o /usr/local/bin/youtube-dl
RUN chmod a+rx /usr/local/bin/youtube-dl

ENV ASPNETCORE_URLS http://*:5000
EXPOSE 5000

ENTRYPOINT ["dotnet", "PodNoms.Api.dll"]
