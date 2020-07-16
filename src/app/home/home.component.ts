import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Profile } from '../core';
import { ProfileStoreService } from '../profile/profile-store.service';
import { AuthService } from '../auth/auth.service';
import { PodcastStoreService } from 'app/podcasts/podcast-store.service';
import { takeUntil, skip, map, first, filter, tap, take } from 'rxjs/operators';
import { BasePageComponent } from 'app/shared/components/base-page/base-page.component';
import { UiStateService } from 'app/core/ui-state.service';
import { NGXLogger } from 'ngx-logger';
import { ProfileDataService } from 'app/profile/profile-data.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnDestroy {
    private _destroyed$: Subject<any>;
    loaded: boolean = false;
    constructor(
        private router: Router,
        private profileStoreService: ProfileStoreService,
        private profileDataService: ProfileDataService,
        private podcastStoreService: PodcastStoreService,
        private authService: AuthService,
        private logger: NGXLogger,
        private uiStateService: UiStateService
    ) {
        this._destroyed$ = new Subject();
        this.logger.debug('home.component', 'ctor');
    }
    ngOnInit() {
        if (this.authService.isLoggedIn()) {
            // no point doing any of this if we have no JWT
            this.profileDataService
                .getProfile()
                .pipe(filter((r) => r !== null))
                .subscribe(
                    (profile) => {
                        const podcastSlug = localStorage.getItem('__spslug');
                        if (podcastSlug) {
                            this.router.navigate(['podcasts', podcastSlug], {
                                replaceUrl: true,
                            });
                        } else {
                            const storeSubscriber = this.podcastStoreService.getAll();
                            storeSubscriber.pipe().subscribe((p) => {
                                if (p && p.length !== 0) {
                                    this.router.navigate([
                                        'podcasts',
                                        p[0].slug,
                                    ]);
                                } else {
                                    this.router.navigate(['podcasts']);
                                }
                            });
                        }
                    },
                    (err) => {
                        this.logger.error('home.component', 'err', err);
                        this.authService.logout();
                    }
                );
        } else {
            this.loaded = true;
        }
    }
    ngOnDestroy() {
        this._destroyed$.next();
        this._destroyed$.complete();
    }
}
