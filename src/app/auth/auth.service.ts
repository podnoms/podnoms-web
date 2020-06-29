import { map, filter, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { BaseService } from '../core/base.service';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { Router } from '@angular/router';
import {
    AuthService as SocialAuthService,
    FacebookLoginProvider,
    LoginOpt,
    GoogleLoginProvider,
} from 'angularx-social-login';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Profile } from '../core';
import { AuthApiProxyService } from './auth-api-proxy.service';
import { ProfileStoreService } from '../profile/profile-store.service';
import { AppDispatchers } from 'app/store/app-config/dispatchers';
import { NGXLogger } from 'ngx-logger';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from 'environments/environment.prod';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root',
})
export class AuthService extends BaseService {
    private authNavStatusSource = new BehaviorSubject<boolean>(false);
    authNavStatus$ = this.authNavStatusSource.asObservable();

    currentUser: Profile;
    profile$ = new BehaviorSubject<Profile>(null);

    guid: string;
    constructor(
        private router: Router,
        private socialAuthService: SocialAuthService,
        private podnomsAuthService: AuthApiProxyService,
        private profileStoreService: ProfileStoreService,
        private appDispatchers: AppDispatchers,
        private cookieService: CookieService,
        private logger: NGXLogger
    ) {
        super();
    }

    reloadProfile(): Observable<boolean> {
        return this.bootstrap();
    }
    bootstrap(): Observable<boolean> {
        this.profile$.pipe(filter((r) => r != null)).subscribe((p) => {
            this.logger.debug('auth.service', 'profile$', p);
            this.currentUser = p;
        });
        const ret = new Subject<boolean>();
        try {
            if (this.isLoggedIn()) {
                this.profileStoreService.getAll();
                this.profileStoreService.entities$.subscribe((results) => {
                    if (results.length !== 0) {
                        this.profile$.next(results[0]);
                        this.authNavStatusSource.next(true);
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
        return localStorage.getItem('refresh_token') ? true : false;
    }
    checkHasRoles(roles: string[]) {
        if (this.currentUser && this.currentUser.roles) {
            const matches = roles.filter((e) =>
                this.currentUser.roles.includes(e)
            );
            return matches.length === roles.length;
        }
        return false;
    }
    setAuthToken(qry: string) {
        this.logger.info('auth.service', 'setAuthToken', qry);
        this.logger.info(
            'auth.service',
            'setAuthToken',
            environment.rtTokenKey
        );
        localStorage.setItem(environment.rtTokenKey, qry);
    }
    getAuthToken(): string {
        return localStorage.getItem(environment.rtTokenKey);
    }
    refreshToken(): Observable<boolean> {
        return this.podnomsAuthService
            .refreshToken(localStorage.getItem('refresh_token'))
            .pipe(
                map((res) => {
                    this._storeAuth(res);
                    return true;
                }),
                catchError((err: HttpErrorResponse) => {
                    if (err.status === 400) {
                        this.logger.debug(
                            'auth.service',
                            'refreshToken',
                            'Failed to refresh token',
                            err.error
                        );
                        this.logout();
                    }
                    return this.handleError(err);
                })
            );
    }

    socialLogin(provider: string): Observable<boolean> {
        if (provider === 'facebook') {
            return this._loginFacebook();
        } else if (provider === 'google-oauth2') {
            return this._loginGoogle();
        }
    }
    login(userName: string, password: string): Observable<boolean> {
        this.logger.info('auth.service', 'login', userName, password);

        return this.podnomsAuthService.login(userName, password).pipe(
            map((res) => {
                this.logger.info('auth.service', 'login', 'SUCCEEDED', res);
                this._storeAuth(res);
                return true;
            }),
            catchError((err) => {
                this.logger.error('auth.service', 'Error logging in');
                this.logger.error('auth.service', 'catchError', err);
                throw err;
            })
        );
    }
    logout() {
        localStorage.clear();
        this.cookieService.deleteAll();

        this.profile$.next(null);
        this.authNavStatusSource.next(false);
        this.appDispatchers.clearAllStorage();

        setTimeout(() => {
            this.router.navigateByUrl('/?action=Reload', {
                skipLocationChange: false,
                replaceUrl: true,
            });
        }, 500);
        // window.location.reload();
    }
    register(
        username: string,
        email: string,
        password: string
    ): Observable<boolean> {
        return this.podnomsAuthService
            .register(username, email, password)
            .pipe(map(() => true));
    }
    forgotPassword(userName: string): Observable<any> {
        return this.podnomsAuthService.forgotPassword(userName);
    }
    resetPassword(
        email: string,
        newPassword: string,
        newPasswordRepeat: string,
        code: string
    ): Observable<boolean> {
        return this.podnomsAuthService
            .resetPassword(email, newPassword, newPasswordRepeat, code)
            .pipe(map(() => true));
    }
    private _storeAuth(response: any, bootstrap: boolean = true) {
        this.setAuthToken(response.jwt.token);
        localStorage.setItem('refresh_token', response.refresh);
        if (bootstrap) {
            this.bootstrap();
        }
    }
    private _loginGoogle(): Observable<boolean> {
        const ret = new Subject<boolean>();
        this.socialAuthService
            .signIn(GoogleLoginProvider.PROVIDER_ID)
            .then((user) => {
                if (user) {
                    this.podnomsAuthService.googleLogin(user.idToken).subscribe(
                        (res) => {
                            this._storeAuth(res, false);
                            ret.next(true);
                        },
                        (err) => ret.next(false)
                    );
                }
            });
        return ret;
    }
    private _loginFacebook(): Observable<boolean> {
        const ret = new Subject<boolean>();
        const options: LoginOpt = {
            scope: 'email public_profile',
        };
        this.socialAuthService
            .signIn(FacebookLoginProvider.PROVIDER_ID, options)
            .then((user) => {
                if (user) {
                    this.podnomsAuthService
                        .facebookLogin(user.authToken)
                        .subscribe(
                            (res) => {
                                this._storeAuth(res);
                                ret.next(true);
                            },
                            () => ret.next(false)
                        );
                }
            });
        return ret;
    }
}
