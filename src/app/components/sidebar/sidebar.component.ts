import { AudioService, PlayState } from './../../core/audio.service';
import { PodcastStoreService } from './../../podcasts/podcast-store.service';
import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { Podcast } from 'app/core';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    selected: Podcast;
    podcasts$: Observable<Podcast[]>;
    loading$: Observable<boolean>;
    playerOpen: boolean;

    public config: PerfectScrollbarConfigInterface = {};
    constructor(
        private router: Router,
        private audioService: AudioService,
        private podcastStore: PodcastStoreService
    ) {
        this.podcasts$ = podcastStore.entities$;
        this.loading$ = podcastStore.loading$;
    }
    ngOnInit() {
        this.podcastStore.getAll();
        this.audioService.playStateChanged.subscribe(s => {
            this.playerOpen = s !== PlayState.none;
        });
    }
    doAddPodcast() {
        this.router.navigate(['podcasts/add']);
    }
}
