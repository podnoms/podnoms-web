import { PodcastEntry } from '.';

export class NowPlaying {
    constructor(url: string, entry: PodcastEntry) {
        this.url = url;
        this.entry = entry;
    }
    url: string;
    entry: PodcastEntry;
}
