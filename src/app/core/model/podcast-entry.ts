import { Shareable } from './shareable';

export class PodcastEntry extends Shareable {
    uid?: string;
    author?: string;
    description?: string;
    sourceUrl: string;
    audioUrl?: string;
    imageUrl?: string;
    thumbnailUrl?: string;
    processed: boolean;
    createDate?: Date;
    processingStatus?: string;
    processingPayload?: string;
    podcastSlug?: string;
    podcastTitle?: string;
    podcastId?: string;
    lastEntryDate?: Date;
    constructor(podcastId?: string, sourceUrl?: string) {
        super();
        this.podcastId = podcastId;
        this.sourceUrl = sourceUrl;
        this.processed = false;
    }
}
