import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Profile } from '../core';
import { ProfileStoreService } from '../profile/profile-store.service';
import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    profile$: Observable<Profile[]>;
    loaded: boolean = false;
    constructor(
        router: Router,
        profileStoreService: ProfileStoreService,
        authService: AuthService
    ) {
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
}
