import { CLEAR_STATE } from './app-config/actions';

function logout(reducer: any) {
    return function(state: any, action: any) {
        return reducer(action.type === CLEAR_STATE ? undefined : state, action);
    };
}
