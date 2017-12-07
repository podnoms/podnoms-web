import { ProfileModel } from './../models/profile.model';
import { Action } from '@ngrx/store';
//#region Load
export const LOAD = '[Profile] Load';
export const LOAD_SUCCESS = '[Profile] Load Success';
export const LOAD_FAIL = '[Profile] Load Fail';
export class LoadAction implements Action {
    readonly type = LOAD;
    constructor() {}
}
export class LoadSuccessAction implements Action {
    readonly type = LOAD_SUCCESS;
    constructor(public payload: ProfileModel) {}
}
export class LoadFailAction implements Action {
    readonly type = LOAD_FAIL;
    constructor(public payload: any) {}
}
//#endregion
//#region Update
export const UPDATE = '[Profile] Update Entry';
export const UPDATE_SUCCESS = '[Profile] Update Entry Success';
export const UPDATE_FAIL = '[Profile] Update Entry Fail';
export class UpdateAction implements Action {
    readonly type = UPDATE;
    constructor(public payload: ProfileModel) {
        console.log(payload);
    }
}
export class UpdateSuccessAction implements Action {
    readonly type = UPDATE_SUCCESS;
    constructor(public payload: ProfileModel) {}
}
//#endregion

export type Actions =
    | LoadAction
    | LoadSuccessAction
    | LoadFailAction
    | UpdateAction
    | UpdateSuccessAction;
