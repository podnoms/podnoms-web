import { UpdateAction, UPDATE_SUCCESS } from './../actions/entries.actions';
import { Router } from '@angular/router';
import { PodcastModel } from 'app/models/podcasts.models';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { PodcastService } from 'app/services/podcast.service';
import * as podcasts from 'app/actions/podcast.actions';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';

@Injectable()
export class PodcastsEffects {
    @Effect()
    get$ = this.actions$
        .ofType(podcasts.LOAD)
        .switchMap(payload => this._service.get())
        .map(res => ({ type: podcasts.LOAD_SUCCESS, payload: res }))
        // remove this because it was causing a horrid redirect
        // .do(res => {
        //     this.router.navigate(['/podcasts', res.payload[0].slug])
        // })
        .catch(() => Observable.of({ type: podcasts.LOAD_FAIL }));
    @Effect()
    addPodcast$ = this.actions$
        .ofType(podcasts.ADD)
        .switchMap((action: podcasts.AddAction) => this._service.addPodcast(action.payload))
        .map(res => ({ type: podcasts.ADD_SUCCESS, payload: res }))
        .do(res => {
            this.router.navigate(['/podcasts', res.payload.slug]);
        });
    @Effect()
    getPodcast$ = this.actions$
        .ofType(podcasts.GET)
        .switchMap((action: podcasts.GetAction) => this._service.getPodcast(action.payload))
        .map(res => ({ type: podcasts.GET_SUCCESS, payload: res }))
        .catch(() => Observable.of({ type: podcasts.GET_FAIL }));
    @Effect()
    update$ = this.actions$.ofType(podcasts.UPDATE).switchMap((action: podcasts.UpdateAction) =>
        this._service
            .updatePodcast(action.payload)
            .map(res => ({
                type: podcasts.UPDATE_SUCCESS,
                payload: action.payload
            }))
            .do(res => this.router.navigate(['/podcasts', res.payload.slug]))
            .catch(() => Observable.of({ type: podcasts.UPDATE_FAIL }))
        );
    @Effect()
    delete$ = this.actions$.ofType(podcasts.DELETE).switchMap((action: podcasts.DeleteAction) =>
        this._service
            .deletePodcast(action.payload)
            .map(res => ({
                type: podcasts.DELETE_SUCCESS,
                payload: action.payload
            }))
            .catch(() => Observable.of({ type: podcasts.DELETE_FAIL }))
    );
    constructor(private actions$: Actions, private router: Router, private _service: PodcastService) {}
}
