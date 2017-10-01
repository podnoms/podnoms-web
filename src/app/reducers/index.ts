import * as fromPodcasts from './podcasts.reducer';

import { ActionReducerMap } from '@ngrx/store';

export interface State {
    podcasts: fromPodcasts.State
}

export const reducers: ActionReducerMap<State> = {
    podcasts: fromPodcasts.reducer
}
