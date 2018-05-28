import { Component, OnInit } from '@angular/core';
import { MasterDetailCommands, Podcast } from '../../core';

import { Observable } from 'rxjs';
import { ComponentsService } from '../components.service';
import { PodcastStoreService } from '../../podcasts/podcast-store.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    selected: Podcast;
    podcasts$: Observable<Podcast[]>;
    loading$: Observable<boolean>;

    constructor(private router: Router, private _podcastService: PodcastStoreService) {
        this.podcasts$ = _podcastService.entities$;
        this.loading$ = _podcastService.loading$;
    }
    ngOnInit() {
        this._podcastService.getAll();
    }
    doAddPodcast() {
        this.router.navigate(['podcasts/add']);
    }
}
