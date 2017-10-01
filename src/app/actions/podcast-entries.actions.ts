import { PodcastModel, PodcastEntryModel } from 'app/models/podcasts.models';
import { Action } from '@ngrx/store';

export const ADD_ENTRY = '[Entries] Add Entry';
export const UPDATE_ENTRY = '[Entries] Update Entry';
export const ADD_ENTRY_SUCCESS = '[Entries] Add Entry Success';
export const ADD_ENTRY_FAIL = '[Entries] Add Entry Fail';

export const DELETE_ENTRY = '[Entries] Delete Entry';
export const DELETE_ENTRY_SUCCESS = '[Entries] Delete Entry Success';
export const DELETE_ENTRY_FAIL = '[Entries] Delete Entry Fail';

export class DeleteEntryAction implements Action {
    readonly type = DELETE_ENTRY;
    constructor(public payload: string) {
        console.log(payload);
    }
}

export class DeleteEntrySuccessAction implements Action {
    readonly type = DELETE_ENTRY_SUCCESS;
    constructor(public payload: PodcastModel) { }
}
export class AddEntryAction implements Action {
    readonly type = ADD_ENTRY;
    constructor(public payload: any) {
        console.log(payload);
    }
}
export class UpdateEntryAction implements Action {
    readonly type = UPDATE_ENTRY;
    constructor(public payload: string) {
        console.log(payload);
    }
}

export class AddEntrySuccessAction implements Action {
    readonly type = ADD_ENTRY_SUCCESS;
    constructor(public payload: PodcastEntryModel) { }
}

export type Actions =
    | DeleteEntryAction
    | DeleteEntrySuccessAction;
