import { LoadAction } from './../actions/entries.actions';
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
    // @Effect()
    // get$ = this.actions$
    //     .ofType(entries.LOAD)
    //     .switchMap((payload: entries.LoadAction) => this.podcastsService.getEntries(payload.podcast)
    //         // If successful, dispatch success action with result
    //         .map(res => ({ type: entries.LOAD_SUCCESS, payload: res.json() }))
    //         // If request fails, dispatch failed action
    //         .catch(() => Observable.of({ type: entries.LOAD_FAIL }))
    //     );
    // @Effect()
    // delete$ = this.actions$
    //     .ofType(entries.DELETE)
    //     .switchMap((action: entries.DeleteAction) => this.podcastsService.deleteEntry(action.payload)
    //         .map(res => ({ type: entries.DELETE_SUCCESS, payload: res }))
    //         .catch(() => Observable.of({ type: entries.DELETE_FAIL }))
    //     );
    @Effect()
    add$ = this.actions$
        .ofType(entries.ADD)
        .switchMap((action: entries.AddAction) => this.podcastsService.addEntry(action.payload.podcastId, action.payload.sourceUrl)
            .map(res => ({ type: entries.ADD_SUCCESS, payload: res }))
            .catch(() => Observable.of({ type: entries.ADD_FAIL }))
        );
    constructor(
        private podcastsService: PodcastService,
        private actions$: Actions
    ) { }
}
