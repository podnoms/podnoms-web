import { Action } from '@ngrx/store';

export const CLEAR_STATE = 'CLEAR_STATE [SESSION] ';

export class ClearAllState implements Action {
    readonly type = CLEAR_STATE;
    constructor() {}
}

export type All = ClearAllState;
