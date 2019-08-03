import { PodcastEntry } from '.';

export class NowPlaying {
    constructor(url: string, entry: PodcastEntry) {
        this.url = url;
        this.entry = entry;
        if (entry) {
            this._id = entry.id;
        }
    }
    _id: string;
    url: string;
    entry: PodcastEntry;
}
