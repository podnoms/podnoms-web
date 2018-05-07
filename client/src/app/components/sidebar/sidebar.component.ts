import { PodcastAddFormComponent } from './../podcast/podcast-add-form/podcast-add-form.component';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PodcastModel } from '../../models/podcasts.models';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/skip';
import { ApplicationState } from 'app/store';
import * as fromPodcastActions from 'app/actions/podcast.actions';
import * as fromPodcasts from 'app/reducers';
import { Router } from '@angular/router';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
    podcasts$: Observable<PodcastModel[]>;
    constructor(
        private _store: Store<ApplicationState>,
        private _router: Router
    ) {
        this.podcasts$ = _store.skip(1).map((s) => s.podcasts.results);
        this._store.dispatch(new fromPodcastActions.LoadAction());
    }
    onSelect(podcast) {
        this._store.dispatch(new fromPodcastActions.GetAction(podcast.slug));
        return false;
    }

    doAddPodcast() {
        this._router.navigate(['add']);
    }
}
