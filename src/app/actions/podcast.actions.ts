import {Action} from "@ngrx/store";
import {PodcastModel} from "../models/podcasts.models";

export const LOAD = '[Podcasts] Load';
export const LOAD_SUCCESS = '[Podcasts] Load Success';
export const LOAD_FAIL = '[Podcasts] Load Fail';

export class LoadPodcastsAction implements Action {
    readonly type = LOAD;
    constructor(public payload: PodcastModel[]) {

    }
}

export class LoadPodcastsSuccessAction implements Action {
    readonly type = LOAD_SUCCESS;

    constructor(public payload: PodcastModel[]) {

    }
}

export class LoadPodcastsFailAction implements Action {
    readonly type = LOAD_FAIL;
}

export type Actions =
    | LoadPodcastsAction
    | LoadPodcastsSuccessAction
    | LoadPodcastsFailAction;
