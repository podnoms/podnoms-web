import { ProfileModel } from 'app/models/profile.model';
import { Component, OnInit } from '@angular/core';
import { PodnomsAuthService } from '../../services/podnoms-auth.service';
import { ProfileService } from '../../services/profile.service';
import { Observable } from 'rxjs/Observable';
import { UiStateService } from '../../services/ui-state.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    user$: Observable<ProfileModel>;

    constructor(
        private _authService: PodnomsAuthService,
        private _profileService: ProfileService,
        private _uiStateService: UiStateService
    ) {}

    ngOnInit() {
        if (this._authService.isAuthenticated()) {
            this.user$ = this._profileService.getProfile();
        }
    }
    toggleOverlay() {
        this._uiStateService.toggleOverlay();
    }
    logout() {
        this._authService.logout();
    }
}
