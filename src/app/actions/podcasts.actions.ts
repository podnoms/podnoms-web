import { PodcastModel } from 'app/models/podcasts.models';
import { Action } from '@ngrx/store';

export const LOAD_PODCASTS = '[Podcasts] Load';
export const LOAD_PODCASTS_SUCCESS = '[Podcasts] Load Success';
export const LOAD_PODCASTS_FAIL = '[Podcasts] Load Fail';
export const GET_PODCAST = '[Podcasts] Get Podcast';
export const GET_PODCAST_SUCCESS = '[Podcasts] Get Podcast Success';
export const GET_PODCAST_FAIL = '[Podcasts] Get Podcast Fail';

/**
 * Load Podcasts Actions
 */
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
export type Actions =
    | LoadPodcastsAction
    | LoadPodcastsSuccessAction
    | LoadPodcastsFailAction
    | GetPodcastAction
    | GetPodcastSuccessAction;
