import { PodcastModel } from './../models/podcasts.models';
import { PodcastEntryModel } from 'app/models/podcasts.models';
import { Action } from '@ngrx/store';

//#region Load
export const LOAD = '[Entries] Load';
export const LOAD_SUCCESS = '[Entries] Load Success';
export const LOAD_FAIL = '[Entries] Load Fail';
export class LoadAction implements Action {
    readonly type = LOAD;
    constructor(public podcast: string) {}
}
export class LoadSuccessAction implements Action {
    readonly type = LOAD_SUCCESS;
    constructor(public payload: PodcastEntryModel[]) {}
}
export class LoadFailAction implements Action {
    readonly type = LOAD_FAIL;
    constructor(public payload: any) {}
}
//#endregion
//#region Add
export const ADD = '[Entries] Add Entry';
export const ADD_SUCCESS = '[Entries] Add Entry Success';
export const ADD_FAIL = '[Entries] Add Entry Fail';
export class AddAction implements Action {
    readonly type = ADD;
    constructor(public payload: any) {
        console.log('EntryReducer', 'AddAction', payload);
    }
}
export class AddSuccessAction implements Action {
    readonly type = ADD_SUCCESS;
    constructor(public payload: PodcastEntryModel) {
        console.log('entries.actions.ts', 'AddSuccessACtion', payload);
        console.log('EntryReducer', 'AddSuccessAction', payload);
    }
}
//#endregion
//#region Update
export const UPDATE = '[Entries] Update Entry';
export const UPDATE_SUCCESS = '[Entries] Update Entry Success';
export const UPDATE_FAIL = '[Entries] Update Entry Fail';
export class UpdateAction implements Action {
    readonly type = UPDATE;
    constructor(public payload: PodcastEntryModel) {
        console.log(payload);
    }
}
export class UpdateSuccessAction implements Action {
    readonly type = UPDATE_SUCCESS;
    constructor(public payload: PodcastEntryModel) {}
}
//#endregion
//#region Delete
export const DELETE = '[Entries] Delete Entry';
export const DELETE_SUCCESS = '[Entries] Delete Entry Success';
export const DELETE_FAIL = '[Entries] Delete Entry Fail';
export class DeleteAction implements Action {
    readonly type = DELETE;
    constructor(public payload: number) {}
}
export class DeleteSuccessAction implements Action {
    readonly type = DELETE_SUCCESS;
    constructor(public payload: number) {}
}
//#endregion
export type Actions =
    | LoadAction
    | LoadSuccessAction
    | LoadFailAction
    | AddSuccessAction
    | UpdateAction
    | UpdateSuccessAction
    | DeleteAction
    | DeleteSuccessAction;
