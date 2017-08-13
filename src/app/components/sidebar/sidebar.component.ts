import { Component, OnInit, Input } from '@angular/core';
import { PodcastService } from '../../services/podcast.service';
import { PodcastModel } from '../../models/podcasts.models';
import { Router, NavigationStart, NavigationEnd, ActivatedRoute } from '@angular/router';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { Observable } from "rxjs";
import { AppStore } from '../../models/app.store';
import { Store } from "@ngrx/store";

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
    @Input() podcasts: PodcastModel[];

    constructor() {
    }

    ngOnInit() {

    }

    deletePodcast() {

    }
}
