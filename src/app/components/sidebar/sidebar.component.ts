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

    constructor(private router: Router, private podcastStoreService: PodcastStoreService) {
        this.podcasts$ = podcastStoreService.entities$;
        this.loading$ = podcastStoreService.loading$;
    }
    ngOnInit() {
        this.podcastStoreService.getAll();
    }
    doAddPodcast() {
        this.router.navigate(['podcasts/add']);
    }
}
