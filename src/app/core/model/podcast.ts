export class Podcast {
    id?: string;
    title: string;
    description?: string;
    slug?: string;
    imageUrl?: string;
    thumbnailUrl?: string;
    customDomain?: string;
    rssUrl?: string;
    podcastEntries?: PodcastEntry[];
}
export class PodcastEntry {
    id?: number;
    uid?: string;
    createDate?: string;
    author?: string;
    title?: string;
    description?: string;
    sourceUrl: string;
    audioUrl?: string;
    imageUrl?: string;
    processed: boolean;
    processingStatus?: string;
    processingPayload?: string;
    podcastSlug?: string;
    podcastTitle?: string;
    podcastId?: number;
    constructor(podcastId?: number, sourceUrl?: string) {
        this.podcastId = podcastId;
        this.sourceUrl = sourceUrl;
        this.processed = false;
    }
}
