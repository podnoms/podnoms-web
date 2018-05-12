import { ProfileModel } from 'app/models/profile.model';
import { PodcastEntryModel } from 'app/models/podcasts.models';
import { PodcastModel } from 'app/models/podcasts.models';
import { ChatModel } from 'app/models/chat.model';
import { ActionReducerMap, createSelector } from '@ngrx/store';
import { ApplicationState } from 'app/store';
import * as fromPodcasts from './podcasts.reducer';
import * as fromEntries from './entries.reducer';
import * as fromProfile from './profile.reducer';
import * as fromChat from './chat.reducer';

export function getSelectedPodcast(state: ApplicationState): PodcastModel {
    return state.podcasts.selectedPodcast;
}
export function getEntries(state: ApplicationState): PodcastEntryModel[] {
    return state.entries.result;
}
export function getProfile(state: ApplicationState): ProfileModel {
    return state.profile.result;
}
export function getChat(state: ApplicationState): ChatModel[] {
    return state.chat.result;
}
export const reducers: ActionReducerMap<ApplicationState> = {
    podcasts: fromPodcasts.reducer,
    entries: fromEntries.reducer,
    profile: fromProfile.reducer,
    chat: fromChat.reducer
};
