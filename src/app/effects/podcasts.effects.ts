import { GET_PODCAST } from './../actions/podcasts.actions';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { PodcastsService } from '../services/podcasts.service';
import * as podcasts from '../actions/podcasts.actions';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class PodcastsEffects {
    @Effect() get$ = this.actions$
        .ofType(podcasts.LOAD_PODCASTS)
        .switchMap(payload => this.podcastsService.get()
            .map(res => ({ type: podcasts.LOAD_PODCASTS_SUCCESS, payload: res }))
            .catch(() => Observable.of({ type: podcasts.LOAD_PODCASTS_FAIL }))
        );
    @Effect() getPodcast$ = this.actions$
        .ofType(podcasts.GET_PODCAST)
        .switchMap((action: podcasts.GetPodcastAction) => this.podcastsService.getPodcast(action.payload)
            .map(res => ({ type: podcasts.GET_PODCAST_SUCCESS, payload: res }))
            .catch(() => Observable.of({ type: podcasts.GET_PODCAST_FAIL }))
        );
    constructor(
        private podcastsService: PodcastsService,
        private actions$: Actions
    ) { }
}
