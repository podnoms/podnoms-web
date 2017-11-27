import { Component, OnInit } from '@angular/core';
import { ProfileModel } from '../../models/profile.model';
import { AuthService } from '../../services/auth.service';
import { ProfileService } from '../../services/profile.service';
import { Observable } from '@aspnet/signalr-client/dist/src/Observable';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    user$: Observable<any>;

    constructor(private _authService: AuthService, private _profileService: ProfileService) {}

    ngOnInit() {
        if (this.loggedIn()) {
            this.user$ = this._profileService.getProfile();
        }
    }

    logout() {
        this._authService.logout();
    }

    loggedIn() {
        return this._authService.isAuthenticated();
    }
}
