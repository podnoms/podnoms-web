import { Component, HostBinding } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from 'app/services/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor(private _authService: AuthService) {}

    loggedIn() {
        return this._authService.authenticated();
    }
}
