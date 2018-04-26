import { ProfileModel } from 'app/models/profile.model';
import * as profile from 'app/actions/profile.actions';
import _ from 'lodash';

export interface State {
    loading: boolean;
    profileId: string;
    result: ProfileModel;
}
export const initialState: State = {
    loading: false,
    profileId: '',
    result: null
};

export function reducer(state = initialState, action: profile.Actions): State {
    switch (action.type) {
        case profile.LOAD: {
            return {
                ...state,
                loading: true
            };
        }
        case profile.LOAD_SUCCESS: {
            return {
                ...state,
                result: action.payload,
                loading: false
            };
        }
        case profile.LOAD_FAIL: {
            return {
                ...state,
                loading: false
            };
        }
        // case profile.UPDATE_SUCCESS: {
        //     const newResults = state.result.map(item => {
        //         return item.id == action.payload.id
        //             ? Object.assign({}, item, action.payload)
        //             : item;
        //     });
        //     const newState = {
        //         ...state,
        //         result: newResults,
        //         loading: false
        //     };
        //     return newState;
        // }
        default: {
            return state;
        }
    }
}
