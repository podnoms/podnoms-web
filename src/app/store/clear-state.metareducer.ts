import { CLEAR_STATE } from './app-config/actions';

function logout(reducer) {
    return function(state, action) {
        return reducer(action.type === CLEAR_STATE ? undefined : state, action);
    };
}
