import { PodcastEntryModel } from 'app/models/podcasts.models';
import * as entries from '../actions/entries.actions';

export interface State {
    loading: boolean;
    podcastId: string;
    entities: { [slug: string]: PodcastEntryModel };
    result: PodcastEntryModel[];
}

export const initialState: State = {
    loading: false,
    podcastId: '',
    entities: {},
    result: []
}

export function reducer(state = initialState, action: entries.Actions): State {
    switch (action.type) {
        case entries.LOAD: {
            return {
                ...state,
                loading: true
            }
        }

        case entries.LOAD_SUCCESS: {

            return {
                ...state,
                result: action.payload,
                loading: false,
            };
        }

        case entries.LOAD_FAIL: {

            return {
                ...state,
                loading: false,
            };
        }

        default: {
            return state;
        }
    }
}