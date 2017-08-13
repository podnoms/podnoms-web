import { PodcastEntryModel, PodcastModel } from './podcasts.models';

export interface AppStore {
    podcasts: PodcastModel[];
    selectedPodcast: PodcastModel;
}