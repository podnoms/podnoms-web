import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PodcastModel } from '../../models/podcasts.models';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { State } from 'app/reducers';
import { LoadPodcastsAction, GetPodcastAction } from 'app/actions/podcasts.actions';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
    podcasts$: Observable<PodcastModel[]>;
    selectedPodcast: PodcastModel;
    constructor(private _store: Store<State>) {
        this.podcasts$ = this._store.select(p => p.podcasts.result);
        this._store.dispatch(new LoadPodcastsAction());
    }
    onSelect(podcast) {
        this._store.dispatch(new GetPodcastAction(podcast.slug));
        return false;
    }
    deletePodcast(podcast) {

    }
}
