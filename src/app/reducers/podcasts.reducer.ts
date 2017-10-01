import { GET_PODCAST_SUCCESS } from './../actions/podcasts.actions';
import { PodcastModel } from './../models/podcasts.models';
import * as podcasts from '../actions/podcasts.actions';

export interface State {
    loading: boolean;
    entities: { [id: string]: PodcastModel };
    result: PodcastModel[];
    selectedPodcast: PodcastModel
}
export const initialState: State = {
    loading: false,
    entities: {},
    result: [],
    selectedPodcast: null
}
export function reducer(state = initialState, action: podcasts.Actions): State {
    switch (action.type) {
        case podcasts.LOAD_PODCASTS: {
            return {
                ...state,
                result: [],
                loading: true,
                selectedPodcast: null
            }
        }
        case podcasts.LOAD_PODCASTS_SUCCESS: {
            return {
                ...state,
                result: action.payload,
                loading: false,
            };
        }
        case podcasts.LOAD_PODCASTS_FAIL: {
            return {
                ...state,
                loading: false,
            };
        }
        case podcasts.GET_PODCAST_SUCCESS: {
            return {
                ...state,
                selectedPodcast: action.payload
            };
        }
        default: {
            return state;
        }
    }
}
