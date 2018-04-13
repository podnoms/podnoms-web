import { ActionReducerMap } from '@ngrx/store';
import * as fromPodcasts from 'app/reducers/podcasts.reducer';
import * as fromEntries from 'app/reducers/entries.reducer';
import * as fromProfile from 'app/reducers/profile.reducer';

export interface ApplicationState {
    podcasts: fromPodcasts.State,
    entries: fromEntries.State,
    profile: fromProfile.State
}


