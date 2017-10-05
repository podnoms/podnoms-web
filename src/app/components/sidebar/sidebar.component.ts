import { PodcastAddFormComponent } from './../podcast/podcast-add-form/podcast-add-form.component';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PodcastModel } from '../../models/podcasts.models';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/skip';
import { State } from 'app/reducers';
import * as fromPodcastActions from 'app/actions/podcast.actions';
import * as fromPodcasts from 'app/reducers';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
    podcasts$: Observable<PodcastModel[]>;
    selectedPodcast$: PodcastModel[];
    constructor(private _store: Store<State>) {
        this.podcasts$ = _store
            .skip(1)
            .map(s => s.podcasts.results);

        this._store.dispatch(new fromPodcastActions.LoadPodcastsAction());
    }
    onSelect(podcast) {
        this._store.dispatch(new fromPodcastActions.GetPodcastAction(podcast.slug));
        return false;
    }
    deletePodcast(podcast) {

    }
}
