import { PodcastModel } from 'app/models/podcasts.models';
import { Action } from '@ngrx/store';

export const LOAD_PODCASTS = '[Podcasts] Load';
export const LOAD_PODCASTS_SUCCESS = '[Podcasts] Load Success';
export const LOAD_PODCASTS_FAIL = '[Podcasts] Load Fail';
export const GET_PODCAST = '[Podcasts] Get Podcast';
export const GET_PODCAST_SUCCESS = '[Podcasts] Get Podcast Success';
export const GET_PODCAST_FAIL = '[Podcasts] Get Podcast Fail';

export const ADD_PODCAST = '[Podcasts] Add Podcast';
export const ADD_PODCAST_SUCCESS = '[Podcasts] Add Podcast Success';
export const ADD_PODCAST_FAIL = '[Podcasts] Add Podcast Fail';

export class LoadPodcastsAction implements Action {
    readonly type = LOAD_PODCASTS;
}

export class LoadPodcastsSuccessAction implements Action {
    readonly type = LOAD_PODCASTS_SUCCESS;

    constructor(public payload: any) { }
}

export class LoadPodcastsFailAction implements Action {
    readonly type = LOAD_PODCASTS_FAIL;

    constructor(public payload: any) { }
}

export class GetPodcastAction implements Action {
    readonly type = GET_PODCAST;
    constructor(public payload: string) { }
}

export class GetPodcastSuccessAction implements Action {
    readonly type = GET_PODCAST_SUCCESS;
    constructor(public payload: PodcastModel) { }
}

export class AddPodcastAction implements Action {
    readonly type = ADD_PODCAST;
    constructor(public payload: PodcastModel) {
    }
}
export class AddPodcastSuccesAction implements Action {
    readonly type = ADD_PODCAST_SUCCESS;
    constructor(public payload: PodcastModel) {
    }
}
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
    | LoadPodcastsAction
    | LoadPodcastsSuccessAction
    | LoadPodcastsFailAction
    | SelectAction
    | DeleteAction
    | DeleteSuccessAction
    | LoadPodcastsFailAction
    | GetPodcastAction
    | GetPodcastSuccessAction;
