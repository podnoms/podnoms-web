import { LoadAction, LOAD_FAIL } from './../actions/chat.actions';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { ProfileService } from 'app/services/profile.service';

import * as chat from '../actions/chat.actions';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ChatService } from '../services/chat.service';

@Injectable()
export class ChatEffects {
    @Effect()
    get$ = this.actions$
        .ofType(chat.LOAD)
        .switchMap((payload: chat.LoadAction) =>
            this._service
                .get()
                .map((res) => ({ type: chat.LOAD_SUCCESS, payload: res }))
                .catch((err) => {
                    console.error('ChatEffects', 'get$', err);
                    return Observable.of({ type: chat.LOAD_FAIL });
                })
        );
    @Effect()
    put$ = this.actions$
        .ofType(chat.ADD)
        .switchMap((action: chat.AddAction) =>
            this._service.send(action.payload)
        )
        .map((res) => ({ type: chat.ADD_SUCCESS, payload: res }));
    @Effect()
    receive$ = this.actions$
    .ofType(chat.RECEIVE)
    .map((res: chat.ReceiveAction) => ({ type: chat.RECEIVE_SUCCESS, payload: res.payload }));
    // receive$ = this.actions$.ofType(chat.RECEIVE).map((res) => {
    //     return { type: chat.RECEIVE_SUCCESS, payload: res };
    // });

    constructor(private _service: ChatService, private actions$: Actions) {}
}
