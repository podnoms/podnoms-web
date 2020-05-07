import {
    Component,
    OnInit,
    Output,
    EventEmitter,
    ViewChild,
    ElementRef,
    AfterViewInit
} from '@angular/core';
import { Observable, of } from 'rxjs';
import {
    debounceTime,
    map,
    tap,
    distinctUntilChanged,
    switchMap,
    catchError
} from 'rxjs/operators';
import { SearchService } from 'app/shared/services/search.service';
import { Router } from '@angular/router';
import { NgxFancyLoggerService } from 'ngx-fancy-logger';

@Component({
    selector: 'app-header-search',
    templateUrl: './header-search.component.html',
    styleUrls: ['./header-search.component.scss']
})
export class HeaderSearchComponent implements AfterViewInit {
    @ViewChild('search', { static: false }) searchElement: ElementRef;

    @Output()
    closeSearch: EventEmitter<any> = new EventEmitter<any>();
    searching: boolean = false;
    searchFailed: boolean = false;
    public model: any;
    constructor(
        private searchService: SearchService,
        private router: Router,
        private logger: NgxFancyLoggerService
    ) {}

    ngAfterViewInit() {
        setTimeout(() => this.searchElement.nativeElement.focus());
    }

    performSearch = (text$: Observable<string>) =>
        text$.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            tap(() => (this.searching = true)),
            switchMap(term =>
                this.searchService.doSearch(term).pipe(
                    tap(() => (this.searchFailed = false)),
                    catchError(e => {
                        this.logger.debug(
                            'header-search.component',
                            'searchError',
                            e
                        );
                        this.searchFailed = true;
                        return of([]);
                    })
                )
            ),
            tap(() => (this.searching = false))
        );

    formatter = (x: { name: string }) => x.name;
    selectSearchItem($event) {
        this.logger.debug(
            'header-search.component',
            'selectSearchItem',
            $event
        );
        this.closeSearch.emit();
        this.router.navigate(['podcasts', $event.item.url]);
    }
    handleCloseSearch() {
        this.closeSearch.emit();
    }
}
