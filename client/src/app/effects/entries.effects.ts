import {
    LoadAction,
    LOAD_FAIL,
    UpdateSuccessAction
} from './../actions/entries.actions';
import { PodcastService } from './../services/podcast.service';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { EntriesService } from '../services/entries.service';

import * as entries from '../actions/entries.actions';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class EntriesEffects {
    @Effect()
    get$ = this.actions$
        .ofType(entries.LOAD)
        .switchMap((payload: entries.LoadAction) =>
            this._service
                .getEntries(payload.podcast)
                .map(res => ({ type: entries.LOAD_SUCCESS, payload: res }))
                .catch(err => {
                    console.error('EntriesEffects', 'get$', err);
                    return Observable.of({ type: entries.LOAD_FAIL });
                })
        );
    @Effect()
    add$ = this.actions$
        .ofType(entries.ADD)
        .switchMap((action: entries.AddAction) =>
            // this is probably (definitely) superfluous as we've now moved
            // the addEntry into the component
            this._service.updateEntry(action.payload)
                .map(res => {
                    console.log('EntriesEffects', 'add$', res);
                    return ({ type: entries.ADD_SUCCESS, payload: res });
                })
                .catch(err => {
                    console.error('EntriesEffects', 'add$', err);
                    return Observable.of({ type: entries.ADD_FAIL });
                })
        );
    @Effect()
    delete$ = this.actions$
        .ofType(entries.DELETE)
        .switchMap((action: entries.DeleteAction) =>
            this._service
                .deleteEntry(action.payload)
                .map(res => ({
                    type: entries.DELETE_SUCCESS,
                    payload: action.payload
                }))
                .catch(() => Observable.of({ type: entries.DELETE_FAIL }))
        );
    @Effect()
    update$ = this.actions$
        .ofType(entries.UPDATE)
        .switchMap((action: entries.UpdateAction) =>
            this._service
                .updateEntry(action.payload)
                .map(res => ({
                    type: entries.UPDATE_SUCCESS,
                    payload: res
                }))
                .catch(err => {
                    console.error('EntriesEffects', 'update$', err);
                    return Observable.of({ type: entries.ADD_FAIL });
                })
        );
    constructor(private _service: PodcastService, private actions$: Actions) {}
}
