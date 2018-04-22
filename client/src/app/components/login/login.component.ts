import { PodnomsAuthService } from './../../services/podnoms-auth.service';

import { AuthService, LoginOpt } from 'angularx-social-login';
import {
    FacebookLoginProvider,
    GoogleLoginProvider,
    LinkedInLoginProvider
} from 'angularx-social-login';

import { Component, NgZone, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    private _subscription: Subscription;

    brandNew: boolean = false;
    username: string;
    password: string;
    isRequesting: boolean = false;
    signIn;
    widget;
    errorMessage: string = '';
    constructor(
        private _authService: PodnomsAuthService,
        private _socialAuthService: AuthService,
        private _activatedRoute: ActivatedRoute,
        private _router: Router
    ) {}
    ngOnInit() {
        this._subscription = this._activatedRoute.queryParams.subscribe(
            (param: any) => {
                this.brandNew = param['brandNew'];
                this.username = param['email'];
            }
        );
    }
    login(provider?: string) {
        this.isRequesting = true;
        if (provider === 'facebook') {
            const options: LoginOpt = {
                scope: 'email public_profile',
                redirect_uri: 'http://localhost:5000/facebook-auth.html'
            };
            this._socialAuthService.signIn(
                FacebookLoginProvider.PROVIDER_ID,
                options
            );
        } else {
            this._authService
                .login(this.username, this.password)
                .finally(() => (this.isRequesting = false))
                .subscribe((result) => {
                    if (result) {
                        this._router.navigate(['/']);
                    }
                }, (error) => (this.errorMessage = error));
        }

        this._socialAuthService.authState.subscribe((user) => {
            this._authService
                .facebookLogin(user.authToken)
                .finally(() => (this.isRequesting = false))
                .subscribe(
                    (result) => {
                        if (result) {
                            this._router.navigate(['/']);
                        }
                    },
                    (error) => {
                        this.errorMessage = error;
                    }
                );
        });
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
