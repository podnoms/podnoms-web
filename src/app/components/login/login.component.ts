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
    errorMessage: string = '';
    constructor(private _authService: AuthService) {}

    ngOnInit() {}
    login(provider?: string) {
        if (!provider) {
            this._authService.loginUsername(
                this.username,
                this.password,
                success => this.loginSuccess(success),
                error => this.loginError(error)
            );
        } else {
            this._authService.loginSocial(provider);
        }
    }
    logout() {}
    loginSuccess(data) {
        console.log('LoginComponent', 'loginSuccess');
    }
    loginError(error) {
        this.errorMessage = 'Unknown username or password!';
        console.error('Error logging in', error);
    }
}
