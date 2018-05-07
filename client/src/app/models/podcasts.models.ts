export class PodcastModel {
    id?: number;
    title: string;
    description?: string;
    slug?: string;
    imageUrl?: string;
    thumbnailUrl?: string;
    rssUrl?: string;
    podcastEntries?: PodcastEntryModel[];
}

export class PodcastEntryModel {
    id?: number;
    podcastId: number;
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
    podcast?: PodcastModel;
    constructor(podcastId?: number, sourceUrl?: string) {
        this.podcastId = podcastId;
        this.sourceUrl = sourceUrl;
        this.processed = false;
    }
}
