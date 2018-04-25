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
    ) { }
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
                scope: 'email public_profile'
            };
            this._socialAuthService.signIn( FacebookLoginProvider.PROVIDER_ID, options)
                .then(user => {
                    if (user) {
                        const rpc = this._authService.facebookLogin(user.authToken);
                        if (!rpc) return;
                        rpc.finally(() => (this.isRequesting = false)).subscribe(
                            (result) => {
                                if (result) {
                                    this._router.navigate(['/podcasts']);
                                }
                            },
                            (error) => {
                                this.errorMessage = error;
                            }
                        );
                    }
                });
        } else if (provider === 'google-oauth2') {
            this._socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
                .then(user => {
                    if (user) {
                        const rpc = this._authService.googleLogin(user.idToken);
                        if (!rpc) return;
                        rpc.finally(() => (this.isRequesting = false)).subscribe(
                            (result) => {
                                if (result) {
                                    this._router.navigate(['/podcasts']);
                                }
                            },
                            (error) => {
                                this.errorMessage = error;
                            }
                        );
                    }
                });
        } else {
            this._authService
                .login(this.username, this.password)
                .finally(() => (this.isRequesting = false))
                .subscribe((result) => {
                    if (result) {
                        this._router.navigate(['/podcasts']);
                    }
                }, (error) => (this.errorMessage = error));
            //we can bail here as we don't need to subscribe to the social auth observer
            return;
        }
    }
    loginSuccess(data) {
        console.log('LoginComponent', 'loginSuccess');
    }
    loginError(error) {
        this.errorMessage = 'Unknown username or password!';
        console.error('Error logging in', error);
    }
}
