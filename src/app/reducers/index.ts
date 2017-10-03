import * as fromPodcasts from './podcasts.reducer';
import * as fromEntries from './entries.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
    podcasts: fromPodcasts.State,
    entries: fromEntries.State
}

export const reducers: ActionReducerMap<AppState> = {
    podcasts: fromPodcasts.reducer,
    entries: fromEntries.reducer
}
