import * as chat from '../actions/chat.actions';
import * as _ from 'lodash';
import { ChatModel } from '../models/chat.model';

export interface State {
    loading: boolean;
    result: ChatModel[];
}

export const initialState: State = {
    loading: false,
    result: []
};

export function reducer(state = initialState, action: chat.Actions): State {
    switch (action.type) {
        case chat.LOAD: {
            return {
                ...state,
                loading: true
            };
        }
        case chat.LOAD_SUCCESS: {
            return {
                ...state,
                result: action.payload,
                loading: false
            };
        }
        case chat.LOAD_FAIL: {
            return {
                ...state,
                loading: false
            };
        }
        case chat.ADD_SUCCESS:
        case chat.RECEIVE_SUCCESS: {
            const newResults = _.clone(state.result);
            newResults.push(action.payload);
            const newState = {
                ...state,
                result: newResults,
                loading: false
            };
            return newState;
        }
        default: {
            return state;
        }
    }
}
