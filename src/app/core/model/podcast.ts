export class Podcast {
    id?: string;
    title: string;
    description?: string;
    slug?: string;
    imageUrl?: string;
    thumbnailUrl?: string;
    customDomain?: string;
    rssUrl?: string;
    createDate?: Date;
    podcastEntries?: PodcastEntry[];
}
export class PodcastEntry {
    id?: string;
    uid?: string;
    author?: string;
    title?: string;
    description?: string;
    sourceUrl: string;
    audioUrl?: string;
    imageUrl?: string;
    processed: boolean;
    createDate?: Date;
    processingStatus?: string;
    processingPayload?: string;
    podcastSlug?: string;
    podcastTitle?: string;
    podcastId?: string;
    constructor(podcastId?: string, sourceUrl?: string) {
        this.podcastId = podcastId;
        this.sourceUrl = sourceUrl;
        this.processed = false;
    }
}
