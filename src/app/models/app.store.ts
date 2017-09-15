import { PodcastEntryModel, PodcastModel } from './podcasts.models';

export interface AppStore {
    readonly podcasts: PodcastModel[];
    readonly selectedPodcast: PodcastModel;
}