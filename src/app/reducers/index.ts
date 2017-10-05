import { PodcastEntryModel } from './../models/podcasts.models';
import { PodcastModel } from 'app/models/podcasts.models';
import * as fromPodcasts from './podcasts.reducer';
import * as fromEntries from './entries.reducer';
import { ActionReducerMap, createSelector } from '@ngrx/store';

export interface State {
    podcasts: fromPodcasts.State,
    entries: fromEntries.State
}

export const reducers: ActionReducerMap<State> = {
    podcasts: fromPodcasts.reducer,
    entries: fromEntries.reducer
}

export function getSelectedPodcast(state: State): PodcastModel {
    return state.podcasts.selectedPodcast;
}
export function getEntries(state: State): PodcastEntryModel[] {
    return state.podcasts.selectedPodcast.podcastEntries;
}
