import { ProfileModel } from 'app/models/profile.model';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ProfileService } from '../../services/profile.service';
import { Observable } from '@aspnet/signalr-client/dist/src/Observable';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    user$: Observable<ProfileModel>;

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
        if (this._authService.isAuthenticated()) {
            console.log('NavbarComponent', 'loggedIn', 'Logged In');
            return true;
        } else {
            console.log('NavbarComponent', 'loggedIn', 'Not logged In');
            return false;
        }
    }
}
