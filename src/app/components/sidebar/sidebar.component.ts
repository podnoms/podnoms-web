import { Component, OnInit, Input } from '@angular/core';
import { PodcastModel } from '../../models/podcasts.models';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
    @Input() podcasts: PodcastModel[];
    selectedPodcast: PodcastModel;

    constructor(private _route: ActivatedRoute) {

    }

    ngOnInit() {

    }

    deletePodcast(podcast) {

    }

    selectPodcast(podcast) {
        console.log('SidebarComponent', 'selectePodcast', podcast);
    }
}
