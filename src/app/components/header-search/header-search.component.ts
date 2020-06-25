import {
    Component,
    OnInit,
    Output,
    EventEmitter,
    ViewChild,
    ElementRef,
    AfterViewInit,
} from '@angular/core';
import { Observable, of, pipe, fromEvent } from 'rxjs';
import {
    debounceTime,
    map,
    tap,
    distinctUntilChanged,
    switchMap,
    catchError,
    filter,
} from 'rxjs/operators';
import { SearchService } from 'app/shared/services/search.service';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';

@Component({
    selector: 'app-header-search',
    templateUrl: './header-search.component.html',
    styleUrls: ['./header-search.component.scss'],
})
export class HeaderSearchComponent implements AfterViewInit {
    @ViewChild('search', { static: false }) searchElement: ElementRef;

    @Output()
    closeSearch: EventEmitter<any> = new EventEmitter<any>();
    searching: boolean = false;
    searchFailed: boolean = false;
    results$: Observable<any[]>;
    t: string = '';

    @Output() searchChangeEmitter: EventEmitter<any> = new EventEmitter<any>();

    searcning: false;
    public model: any;
    constructor(
        private searchService: SearchService,
        private router: Router,
        private logger: NGXLogger
    ) {}

    // optional hook for outer components to
    ngAfterViewInit() {
        this.searchElement.nativeElement.focus();

        this.logger.debug('header-search.component', 'search-changed');
        fromEvent(this.searchElement.nativeElement, 'keyup')
            .pipe(filter(Boolean), debounceTime(500), distinctUntilChanged())
            .subscribe((text) => {
                this.logger.debug('header-search.component', 'searching', text);
                this.results$ = this.searchService
                    .doSearch(this.searchElement.nativeElement.value)
                    .pipe(
                        tap((r) => {
                            this.logger.debug(
                                'header-search.component',
                                'doSearch',
                                r
                            );
                        })
                    );
            });
    }
    selectSearchItem(url: string) {
        this.logger.debug('header-search.component', 'selectSearchItem', url);
        this.closeSearch.emit();
        this.router.navigate(['podcasts', url]);
    }
    handleCloseSearch() {
        this.closeSearch.emit();
    }
}
