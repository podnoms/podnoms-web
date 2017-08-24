import {Component, OnInit, Input} from '@angular/core';
import {PodcastModel} from '../../models/podcasts.models';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import {Store} from "@ngrx/store";
import {AppStore} from "../../models/app.store";
import {Subscription} from "rxjs/Subscription";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
    @Input() podcasts: PodcastModel[];
    @Input() selectedPodcast: PodcastModel;

    constructor(private _store: Store<AppStore>, private _route: ActivatedRoute) {
    }

    ngOnInit() {

    }

    deletePodcast(podcast) {

    }

    selectPodcast(podcast) {
        this._store.dispatch({type: 'SELECT_ITEM', payload: podcast});
    }
}
