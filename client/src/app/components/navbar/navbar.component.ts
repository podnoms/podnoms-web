import { ProfileModel } from 'app/models/profile.model';
import { Component, OnInit } from '@angular/core';
import { PodnomsAuthService } from '../../services/podnoms-auth.service';
import { ProfileService } from '../../services/profile.service';
import { Observable } from 'rxjs/Observable';
import { UiStateService } from '../../services/ui-state.service';
import { ApplicationState } from 'app/store';
import { Store } from '@ngrx/store';
import * as fromProfile from 'app/reducers';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    profile$: Observable<ProfileModel>;

    constructor(
        private _store: Store<ApplicationState>,
        private _profileService: ProfileService,
        private _authService: PodnomsAuthService,
        private _uiStateService: UiStateService
    ) {
        this.profile$ = _store.select(fromProfile.getProfile);
        this.profile$.subscribe((p) =>
            console.log('navbar.component', 'profile$subscribe', p)
        );
        // this.profile$.skip(1).subscribe((p) => (this.originalSlug = p.slug));
    }

    ngOnInit() {}
    toggleSidebar() {
        this._uiStateService.toggleSidebar();
    }
    toggleOverlay() {
        this._uiStateService.toggleOverlay();
    }
    logout() {
        this._authService.logout();
    }
}
