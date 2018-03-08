import { GlobalsService } from './services/globals.service';
import { Component, HostBinding } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from 'app/services/auth.service';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor(private _authService: AuthService) {
        _authService.handleAuthentication();
        _authService.scheduleRenewal();
    }
    loggedIn() {
        return this._authService.isAuthenticated();
    }
}
