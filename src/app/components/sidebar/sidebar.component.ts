import { PodcastStoreService } from './../../podcasts/podcast-store.service';
import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { Podcast } from 'app/core';
import { UiStateService } from 'app/core/ui-state.service';
import { tap } from 'rxjs/operators';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    selected: Podcast;
    podcasts$: Observable<Podcast[]>;
    loading$: Observable<boolean>;
    public scrollConfig: PerfectScrollbarConfigInterface = {};
    constructor(
        private router: Router,
        public uiStateService: UiStateService,
        private podcastStore: PodcastStoreService
    ) {
        this.podcasts$ = podcastStore.entities$.pipe(
            tap(p => console.log('sidebar.component', 'piped', p))
        );
        this.loading$ = podcastStore.loading$;
    }
    ngOnInit() {
        this.podcastStore.getAll();
    }
    closeSidebar() {
        this.uiStateService.closeMobileSidebar();
    }
    doAddPodcast() {
        this.router.navigate(['podcasts/add']);
    }
}
