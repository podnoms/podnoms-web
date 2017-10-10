import { ActionReducerMap } from '@ngrx/store';
import * as fromPodcasts from 'app/reducers/podcasts.reducer';
import * as fromEntries from 'app/reducers/entries.reducer';

export interface ApplicationState {
    podcasts: fromPodcasts.State,
    entries: fromEntries.State
}


