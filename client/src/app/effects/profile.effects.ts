import {
    LoadAction,
    LOAD_FAIL
} from './../actions/profile.actions';
import { PodcastService } from './../services/podcast.service';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { ProfileService } from 'app/services/profile.service';

import * as profile from '../actions/profile.actions';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ProfileEffects {
    @Effect()
    get$ = this.actions$
        .ofType(profile.LOAD)
        .switchMap((payload: profile.LoadAction) =>
            this._service
                .getProfile()
                .map(res => ({ type: profile.LOAD_SUCCESS, payload: res }))
                .catch(err => {
                    console.error('ProfileEffects', 'get$', err);
                    return Observable.of({ type: profile.LOAD_FAIL });
                })
        );

    @Effect()
    update$ = this.actions$
        .ofType(profile.UPDATE)
        .switchMap((action: profile.UpdateAction) =>
            this._service
                .updateProfile(action.payload)
                .map(res => ({
                    type: profile.UPDATE_SUCCESS,
                    payload: res
                }))
                .catch(err => {
                    console.error('EntriesEffects', 'update$', err);
                    return Observable.of({ type: profile.UPDATE_FAIL });
                })
        );
    constructor(private _service: ProfileService, private actions$: Actions) {}
}
