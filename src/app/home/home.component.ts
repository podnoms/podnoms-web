import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Profile } from '../core';
import { ProfileStoreService } from '../profile/profile-store.service';
import { AuthService } from '../auth/auth.service';
import { PodcastStoreService } from 'app/podcasts/podcast-store.service';
import { takeUntil, skip } from 'rxjs/operators';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy {
    private _destroyed$: Subject<any>;
    profile$: Observable<Profile[]>;
    loaded: boolean = false;
    constructor(
        router: Router,
        profileStoreService: ProfileStoreService,
        podcastStoreService: PodcastStoreService,
        authService: AuthService
    ) {
        this._destroyed$ = new Subject();
        console.log('home.component', 'ctor');
        if (authService.getAuthToken()) {
            // no point doing any of this if we have no JWT
            this.profile$ = profileStoreService.entities$;
            this.profile$.subscribe(
                p => {
                    profileStoreService.entities$.subscribe(profileResult => {
                        if (profileResult && profileResult.length !== 0) {
                            if (localStorage.getItem('__spslug')) {
                                router.navigate(
                                    [
                                        `/podcasts/${localStorage.getItem(
                                            '__spslug'
                                        )}`
                                    ],
                                    {
                                        replaceUrl: true,
                                        preserveFragment: false,
                                        skipLocationChange: true
                                    }
                                );
                            } else {
                                podcastStoreService.entities$
                                    .pipe(
                                        skip(1),
                                        takeUntil(this._destroyed$)
                                    )
                                    .subscribe(tt => {
                                        if (tt && tt.length !== 0) {
                                            router.navigate([
                                                'podcasts',
                                                tt[0].slug
                                            ]);
                                        }
                                    });
                            }
                        } else if (
                            profileResult &&
                            profileResult.length === 0
                        ) {
                            // this.loaded = true;
                        }
                    });
                },
                err => {
                    console.error('home.component', 'err', err);
                    authService.logout();
                }
            );
        } else {
            this.loaded = true;
        }
    }
    ngOnInit() {}
    ngOnDestroy() {
        this._destroyed$.next();
        this._destroyed$.complete();
    }
}
