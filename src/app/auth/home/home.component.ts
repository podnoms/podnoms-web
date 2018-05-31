import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProfileStoreService } from '../../profile/profile-store.service';
import { AuthService } from '../auth.service';
import { Profile } from '../../core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    loading$: Observable<boolean>;
    profile$: Observable<Profile[]>;
    loaded: boolean = false;
    constructor(router: Router, profileService: ProfileStoreService, authService: AuthService) {
        this.loading$ = profileService.loading$;
        this.profile$ = profileService.entities$;
        this.profile$.subscribe(
            p => {
                console.log('home.component', 'loading', p);
                profileService.entities$.subscribe(profileResult => {
                    if (profileResult && profileResult.length !== 0) {
                        router.navigate(['/podcasts']);
                    } else if (profileResult && profileResult.length === 0) {
                        this.loaded = true;
                    }
                });
            },
            err => {
                console.log('home.component', 'err', err);
                authService.logout();
            }
        );
        profileService.getAll();
    }
    ngOnInit() {
        console.log('home.component', 'ngOnInit', this);
    }
}
