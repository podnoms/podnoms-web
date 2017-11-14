import { PodcastModel } from 'app/models/podcasts.models';
import { Action } from '@ngrx/store';

//#region Load
export const LOAD = '[Podcasts] Load';
export const LOAD_SUCCESS = '[Podcasts] Load Success';
export const LOAD_FAIL = '[Podcasts] Load Fail';
export class LoadAction implements Action {
    readonly type = LOAD;
}

export class LoadSuccessAction implements Action {
    readonly type = LOAD_SUCCESS;

    constructor(public payload: any) { }
}

export class LoadFailAction implements Action {
    readonly type = LOAD_FAIL;

    constructor(public payload: any) { }
}
//#endregion
//#region Get
export const GET = '[Podcasts] Get Podcast';
export const GET_SUCCESS = '[Podcasts] Get Podcast Success';
export const GET_FAIL = '[Podcasts] Get Podcast Fail';
export class GetAction implements Action {
    readonly type = GET;
    constructor(public payload: string) { }
}

export class GetSuccessAction implements Action {
    readonly type = GET_SUCCESS;
    constructor(public payload: PodcastModel) { }
}
//#endregion
//#region Add
export const ADD = '[Podcasts] Add Podcast';
export const ADD_SUCCESS = '[Podcasts] Add Podcast Success';
export const ADD_FAIL = '[Podcasts] Add Podcast Fail';
export class AddAction implements Action {
    readonly type = ADD;
    constructor(public payload: PodcastModel) {
    }
}
export class AddSuccessAction implements Action {
    readonly type = ADD_SUCCESS;
    constructor(public payload: PodcastModel) {
    }
}
//#endregion
//#region Update
export const UPDATE = '[Podcasts] Update Podcast';
export const UPDATE_SUCCESS = '[Podcasts] Update Podcast Success';
export const UPDATE_FAIL = '[Podcasts] Update Podcast Fail';
export class UpdateAction implements Action {
    readonly type = UPDATE;
    constructor(public payload: PodcastModel) {
    }
}
export class UpdateSuccessAction implements Action {
    readonly type = UPDATE_SUCCESS;
    constructor(public payload: PodcastModel) {
    }
}
//#endregion
//#region Select
export const SELECT = '[Podcasts] Select';
export class SelectAction implements Action {
    readonly type = SELECT;
    constructor(public payload: string) {
    }
}
//#endregion
//#region Delete
export const DELETE = '[Podcasts] Delete';
export const DELETE_SUCCESS = '[Podcasts] Delete Success';
export const DELETE_FAIL = '[Podcasts] Delete Fail';
export class DeleteAction implements Action {
    readonly type = DELETE;
    constructor(public payload: number) {
    }
}
export class DeleteSuccessAction implements Action {
    readonly type = DELETE_SUCCESS;
    constructor(public payload: number) { }
}
//#endregion
export type Actions =
    | LoadAction
    | LoadSuccessAction
    | LoadFailAction
    | SelectAction
    | AddAction
    | AddSuccessAction
    | UpdateAction
    | UpdateSuccessAction
    | DeleteAction
    | DeleteSuccessAction
    | LoadFailAction
    | GetAction
    | GetSuccessAction;
