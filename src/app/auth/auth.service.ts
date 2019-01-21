import { map } from 'rxjs/operators';
import { Injectable, OnInit } from '@angular/core';
import { BaseService } from '../core/base.service';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { Router } from '@angular/router';
import {
    AuthService as SocialAuthService,
    FacebookLoginProvider,
    LoginOpt,
    GoogleLoginProvider
} from 'angularx-social-login';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Profile } from '../core';
import { AuthApiProxyService } from './auth-api-proxy.service';
import { HttpHeaders } from '@angular/common/http/src/headers';
import { ProfileStoreService } from '../profile/profile-store.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService extends BaseService {
    private _authNavStatusSource = new BehaviorSubject<boolean>(false);
    authNavStatus$ = this._authNavStatusSource.asObservable();

    profile$ = new BehaviorSubject<Profile>(null);

    private profileSubject = new BehaviorSubject<Profile>(null);
    guid: string;
    constructor(
        private router: Router,
        private socialAuthService: SocialAuthService,
        private podnomsAuthService: AuthApiProxyService,
        private profileStoreService: ProfileStoreService
    ) {
        super();
    }

    bootstrap(): Observable<boolean> {
        const ret = new Subject<boolean>();
        try {
            if (this.isLoggedIn()) {
                this.profileStoreService.getAll();
                this.profileStoreService.entities$.subscribe(results => {
                    if (results.length !== 0) {
                        this.profile$.next(results[0]);
                        this._authNavStatusSource.next(true);
                        ret.next(true);
                    }
                });
            }
            return ret;
        } catch (err) {
            this.logout();
        }
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
        } else if (provider === 'google-oauth2') {
            return this._loginGoogle();
        }
    }
    login(userName: string, password: string): Observable<boolean> {
        return this.podnomsAuthService.login(userName, password).pipe(
            map(res => {
                localStorage.setItem('auth_token', res.auth_token);
                this.bootstrap();
                return true;
            })
        );
    }
    logout() {
        localStorage.clear();
        this.profile$.next(null);
        this._authNavStatusSource.next(false);
        this.router.navigate(['']);
        window.location.reload();
    }
    register(email: string, password: string): Observable<boolean> {
        return this.podnomsAuthService.register(email, password).pipe(map(r => true));
    }
    forgotPassword(userName: string): Observable<any> {
        return this.podnomsAuthService.forgotPassword(userName);
    }
    resetPassword(email: string, newPassword: string, newPasswordRepeat: string, code: string): Observable<boolean> {
        return this.podnomsAuthService
            .resetPassword(email, newPassword, newPasswordRepeat, code)
            .pipe(map(res => true));
    }
    private _loginGoogle(): Observable<boolean> {
        const ret = new Subject<boolean>();
        this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(user => {
            if (user) {
                const rpc = this.podnomsAuthService.googleLogin(user.idToken).subscribe(
                    res => {
                        localStorage.setItem('auth_token', res.auth_token);
                        this.bootstrap();
                        ret.next(true);
                    },
                    err => ret.next(false)
                );
            }
        });
        return ret;
    }
    private _loginFacebook(): Observable<boolean> {
        const ret = new Subject<boolean>();
        const options: LoginOpt = {
            scope: 'email public_profile'
        };
        this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID, options).then(user => {
            if (user) {
                this.podnomsAuthService.facebookLogin(user.authToken).subscribe(
                    res => {
                        localStorage.setItem('auth_token', res.auth_token);
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
