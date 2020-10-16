import { Component, OnInit } from '@angular/core';
import { SiteMessagesService } from 'app/shared/services/site-messages.service';
import { Observable, of } from 'rxjs';
import { SiteMessage } from 'app/core';
import { tap } from 'rxjs/operators';
import { NGXLogger } from 'ngx-logger';
import { UiStateService } from 'app/core/ui-state.service';

@Component({
    selector: 'app-banner',
    templateUrl: './banner.component.html',
    styleUrls: ['./banner.component.scss'],
})
export class BannerComponent implements OnInit {
    // isOpen: boolean = false;
    banner$: Observable<SiteMessage>;

    constructor(
        private uiStateService: UiStateService,
        private siteMessagesService: SiteMessagesService,
        private logger: NGXLogger
    ) {}

    ngOnInit(): void {
        this.uiStateService.footerOpen$.subscribe((r) => {
            if (r) {
                this.banner$ = of(null);
            }
        });

        this.banner$ = this.siteMessagesService.getBanner().pipe(
            tap((r) => {
                // this.isOpen = r !== null;
                this.logger.debug('banner.component', 'got-banner', r);
            })
        );
    }
    closeMe() {
        // this.isOpen = false;
        this.banner$ = of(null);
    }
}
