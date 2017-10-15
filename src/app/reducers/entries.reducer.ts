import { PodcastEntryModel } from 'app/models/podcasts.models';
import * as entries from '../actions/entries.actions';
import _ from 'lodash';

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
        case entries.ADD_SUCCESS: {
            const newResults = state.result;
            newResults.push(action.payload)
            return {
                ...state,
                result: newResults,
                loading: false,
            };
        }
        case entries.UPDATE_SUCCESS: {
            const newEntities  = state.result.map(item => {
                return item.id == action.payload.id ? Object.assign({}, item, action.payload) : item;
            });
            return {
                ...state,
                result: newEntities,
                loading: false,
            };
        }
        case entries.DELETE_SUCCESS:
            const newEntities = state.result.filter(function(item){
                return item.id != action.payload;
            });
            return {
                ...state,
                result: newEntities,
                loading: false,
            };
        default: {
            return state;
        }
    }
}
