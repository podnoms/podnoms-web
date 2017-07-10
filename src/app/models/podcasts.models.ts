import {UUID} from 'angular2-uuid';

export class PodcastModel {
    id?: number;
    title: string;
    description?: string;
    slug?: string;
    imageUrl?: string;
    rssUrl?: string;
    podcastEntries?: PodcastEntryModel[];
}

export class PodcastEntryModel {
    id?: number;
    podcastId: number;
    slug?: string;
    uid?: string;
    author?: string;
    title?: string;
    description?: string;
    sourceUrl: string;
    audioUrl?: string;
    imageUrl?: string;
    processed: boolean;
    processingStatus?: string;
    processingPayload?: string;

    constructor(podcastId: number, sourceUrl: string) {
        this.podcastId = podcastId;
        this.sourceUrl = sourceUrl;
        this.processed = false;
        this.uid = UUID.UUID();
    }
}
