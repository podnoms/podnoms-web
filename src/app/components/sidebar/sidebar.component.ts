import { Component, OnInit } from '@angular/core';
import { MasterDetailCommands, Podcast } from '../../core';

import { Observable } from 'rxjs';
import { ComponentsService } from '../components.service';
import { PodcastStoreService } from '../../podcasts/podcast-store.service';
import { Router } from '@angular/router';
import { EntryDataService } from '../../podcasts/entry-data.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    selected: Podcast;
    podcasts$: Observable<Podcast[]>;
    loading$: Observable<boolean>;

    constructor(private router: Router, private podcastStore: PodcastStoreService,
        entryDataService: EntryDataService) {
        this.podcasts$ = podcastStore.entities$;
        this.loading$ = podcastStore.loading$;
    }
    ngOnInit() {
        this.podcastStore.getAll();
    }
    doAddPodcast() {
        this.router.navigate(['podcasts/add']);
    }
}
