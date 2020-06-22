import { PodcastStoreService } from './../../podcasts/podcast-store.service';
import {
    Component,
    OnInit,
    ViewChild,
    ElementRef,
    AfterViewInit,
} from '@angular/core';

import { Observable, Subject, fromEvent } from 'rxjs';
import { Router } from '@angular/router';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { Podcast } from 'app/core';
import { UiStateService } from 'app/core/ui-state.service';
import { NGXLogger } from 'ngx-logger';
import {
    map,
    filter,
    debounceTime,
    distinctUntilChanged,
} from 'rxjs/operators';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, AfterViewInit {
    orderByField: string = 'lastEntryDate';
    orderByAscending: boolean = true;
    filterValue: string = '';

    selected: Podcast;
    podcasts$: Observable<Podcast[]>;
    loading$: Observable<boolean>;
    @ViewChild('filter')
    filter: ElementRef;
    public scrollConfig: PerfectScrollbarConfigInterface = {
        suppressScrollX: true,
    };
    constructor(
        private router: Router,
        public uiStateService: UiStateService,
        private podcastStore: PodcastStoreService,
        private logger: NGXLogger
    ) {
        this.podcasts$ = podcastStore.entities$;
        this.loading$ = podcastStore.loading$;
    }
    ngOnInit() {
        this.podcastStore.getAll();
    }
    ngAfterViewInit(): void {
        fromEvent(this.filter.nativeElement, 'keyup')
            .pipe(
                // get value
                map((event: any) => {
                    return event.target.value;
                }),
                debounceTime(500),
                distinctUntilChanged()
            )
            .subscribe((text: string) => {
                this.logger.debug(
                    'sidebar.component',
                    'filterTextChanged',
                    text
                );
                this.filterValue = text;
            });
    }
    closeSidebar() {
        this.uiStateService.closeMobileSidebar();
    }
    doAddPodcast() {
        this.router.navigate(['podcasts/add']);
    }
    sort(by: string) {
        if (by === this.orderByField) {
            this.orderByAscending = !this.orderByAscending;
        } else {
            this.orderByField = by;
        }
    }
}
