import { Injectable, OnInit } from '@angular/core';
import { BaseService } from '../core/base.service';
import { Provider } from '@angular/compiler/src/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {
    AuthService as SocialAuthService,
    FacebookLoginProvider,
    LoginOpt
} from 'angularx-social-login';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthResponseModel } from './models/auth-response.model';
import { ProfileService } from './profile.service';
import { Profile } from '../core';
import { PodnomsApiAuthService } from './podnoms-auth.service';

@Injectable({
    providedIn: 'root'
})
export class PodNomsAuthService extends BaseService {
    private _authNavStatusSource = new BehaviorSubject<boolean>(false);
    private authNavStatus$ = this._authNavStatusSource.asObservable();

    private _profileSource = new BehaviorSubject<Profile>(null);
    profile$ = this._profileSource.asObservable();

    private bootstrapped: boolean = false;

    constructor(
        private router: Router,
        private socialAuthService: SocialAuthService,
        private podnomsAuthService: PodnomsApiAuthService,
        private profileService: ProfileService
    ) {
        super();
    }
    bootstrap(): Observable<boolean> {
        const ret = new Subject<boolean>();
        if (this.isLoggedIn()) {
            this.profileService.getAll();
            this.profileService.entities$.subscribe(results => {
                if (results.length !== 0) {
                    this._profileSource.next(results[0]);
                    this._authNavStatusSource.next(true);
                    this.bootstrapped = true;
                    ret.next(true);
                }
            });
        }
        return ret;
    }
    isLoggedIn(): boolean {
        const helper = new JwtHelperService();
        const token = this.getAuthToken();
        return token && !helper.isTokenExpired(token);
    }
    getAuthToken(): string {
        return localStorage.getItem('auth_token');
    }
    socialLogin(provider: string): Observable<boolean> {
        if (provider === 'facebook') {
            return this._loginFacebook();
        }
    }
    login(userName: string, password: string): Observable<boolean> {
        return this.podnomsAuthService.login(userName, password).map(res => {
            localStorage.setItem('auth_token', res.auth_token);
            this.bootstrap();
            return true;
        });
    }
    logout() {
        localStorage.clear();
        this.router.navigate(['']);
    }

    private _loginFacebook(): Observable<boolean> {
        const ret = new Subject<boolean>();
        const options: LoginOpt = {
            scope: 'email public_profile'
        };
        this.socialAuthService
            .signIn(FacebookLoginProvider.PROVIDER_ID, options)
            .then(user => {
                if (user) {
                    this.podnomsAuthService
                        .facebookLogin(user.authToken)
                        .subscribe(
                            res => {
                                localStorage.setItem(
                                    'auth_token',
                                    res.auth_token
                                );
                                this.bootstrap();
                                ret.next(true);
                            },
                            err => ret.next(false)
                        );
                }
            });
        return ret;
    }
}
