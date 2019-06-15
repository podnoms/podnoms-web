import { ActionReducerMap } from '@ngrx/store';

import * as AppActions from './actions';

export interface SessionState {
    entryPlayStates: any;
}

export const initialState: SessionState = {
    entryPlayStates: []
};

export interface AppState {
    session: SessionState;
}

export const appConfigReducers: ActionReducerMap<AppState> = {
    session: sessionReducer
    // here is where i put other reducers, when i have them
};

export function sessionReducer(
    state = initialState,
    action: AppActions.All
): SessionState {
    switch (action.type) {
        case AppActions.CLEAR_STATE: {
            return {
                ...state,
                entryPlayStates: []
            };
        }
    }
    return state;
}
