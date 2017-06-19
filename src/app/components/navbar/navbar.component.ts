import {Component, OnInit} from '@angular/core';
import {ProfileModel} from '../../models/profile.model';
import {AuthService} from '../../services/auth.service';
import {ProfileService} from '../../services/profile.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    user: any;

    constructor(private _authService: AuthService, private _profileService: ProfileService) {

    }

    ngOnInit() {
        if (this.loggedIn()) {
            this.user = this._authService.profile;
            this._profileService.getProfile().subscribe(p => {
                console.log('NavbarComponent', 'getProfile()', p);
            });
        }
    }

    login() {
        this._authService.login();
    }

    logout() {
        this._authService.logout();
    }

    loggedIn() {
        return this._authService.authenticated();
    }
}
