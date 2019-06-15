import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
        route: ActivatedRoute,
        profileStoreService: ProfileStoreService,
        authService: AuthService
    ) {
        console.log('home.component', 'ctor');
        const action = route.snapshot.queryParams.action || '';
        if (action === 'Reload') {
            // we're here from a logout action, reload the page until i can figure out
            // how to clear the ngrx/data stores
            router.navigateByUrl('/', { replaceUrl: true }).then(r => {
                localStorage.clear();
                window.location.reload();
            });
        } else {
            if (authService.getAuthToken()) {
                // no point doing any of this if we have no JWT
                this.profile$ = profileStoreService.entities$;
                this.profile$.subscribe(
                    p => {
                        profileStoreService.entities$.subscribe(
                            profileResult => {
                                if (
                                    profileResult &&
                                    profileResult.length !== 0
                                ) {
                                    router.navigate(['/podcasts']);
                                } else if (
                                    profileResult &&
                                    profileResult.length === 0
                                ) {
                                    // this.loaded = true;
                                }
                            }
                        );
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
    }
    ngOnInit() {}
}
