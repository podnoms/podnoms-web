export class NowPlaying {
    constructor(
        url: string,
        podcastTitle: string,
        episodeTitle: string,
        imageUrl: string
    ) {
        this.url = url;
        this.podcastTitle = podcastTitle;
        this.episodeTitle = episodeTitle;
        this.imageUrl = imageUrl;
    }
    url: string;
    podcastTitle: string;
    episodeTitle: string;
    imageUrl: string;
}
