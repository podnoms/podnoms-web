import { PodcastEntryModel } from 'app/models/podcasts.models';
import * as entries from '../actions/entries.actions';
import * as _ from 'lodash';

export interface State {
    loading: boolean;
    podcastId: string;
    result: PodcastEntryModel[];
}

export const initialState: State = {
    loading: false,
    podcastId: '',
    result: []
};

export function reducer(state = initialState, action: entries.Actions): State {
    switch (action.type) {
        case entries.LOAD: {
            return {
                ...state,
                loading: true
            };
        }
        case entries.LOAD_SUCCESS: {
            return {
                ...state,
                result: action.payload,
                loading: false
            };
        }
        case entries.LOAD_FAIL: {
            return {
                ...state,
                loading: false
            };
        }
        case entries.ADD_SUCCESS: {
            const newResults = _.clone(state.result);
            newResults.push(action.payload);
            const newState = {
                ...state,
                result: newResults,
                loading: false
            };
            return newState;
        }
        case entries.UPDATE_SUCCESS: {
            const newResults = state.result.map(item => {
                return item.id == action.payload.id
                    ? Object.assign({}, item, action.payload)
                    : item;
            });
            const newState = {
                ...state,
                result: newResults,
                loading: false
            };
            return newState;
        }
        case entries.DELETE_SUCCESS:
            const dsNewEntities = state.result.filter(function(item) {
                return item.id != action.payload;
            });
            return {
                ...state,
                result: dsNewEntities,
                loading: false
            };
        default: {
            return state;
        }
    }
}
