import { GET_PODCAST_SUCCESS } from './../actions/podcast.actions';
import { PodcastModel } from './../models/podcasts.models';
import * as podcast from '../actions/podcast.actions';

export interface State {
    loading: boolean;
    entities: { [slug: string]: PodcastModel };
    result: PodcastModel[];
    selectedPodcast: PodcastModel
}
export const initialState: State = {
    loading: false,
    entities: {},
    result: [],
    selectedPodcast: null
}
export function reducer(state = initialState, action: podcast.Actions): State {
    switch (action.type) {
        case podcast.LOAD_PODCASTS: {
            return {
                ...state,
                result: [],
                loading: true,
                selectedPodcast: null
            }
        }
        case podcast.LOAD_PODCASTS_SUCCESS: {
            return {
                ...state,
                result: action.payload,
                loading: false,
            };
        }
        case podcast.LOAD_PODCASTS_FAIL: {
            return {
                ...state,
                loading: false,
            };
        }
        case podcast.GET_PODCAST_SUCCESS: {
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
