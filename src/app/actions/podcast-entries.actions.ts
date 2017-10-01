import { PodcastModel } from 'app/models/podcasts.models';
import { Action } from '@ngrx/store';

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

export type Actions =
    | DeleteEntryAction
    | DeleteEntrySuccessAction;
