import { AuthService } from './../../services/auth.service';
import { Component, NgZone, OnInit } from '@angular/core';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    user: any;
    username: string;
    password: string;

    signIn;
    widget;

    constructor(private _authService: AuthService) {}

    ngOnInit() {}
    login() {
        this._authService.login(
            this.username,
            this.password,
            success => this.loginSuccess(success),
            error => this.loginError(error)
        );
    }
    logout() {}

    loginSuccess(data) {
        alert('Hello Sailor!!!');
    }
    loginError(error) {
        console.error('Error logging in', error);
    }
}
