import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PodcastModel } from '../../models/podcasts.models';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { AppState } from 'app/reducers';
import * as fromPodcasts from 'app/actions/podcast.actions';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
    podcasts$: Observable<any[]>; // PodcastModel[]>;
    selectedPodcast: PodcastModel;
    constructor(private _store: Store<AppState>) {
        this.podcasts$ = this._store.select('podcasts');
        this._store.dispatch(new fromPodcasts.LoadPodcastsAction());
    }
    onSelect(podcast) {
        this._store.dispatch(new fromPodcasts.GetPodcastAction(podcast.slug));
        return false;
    }
    deletePodcast(podcast) {

    }
}
