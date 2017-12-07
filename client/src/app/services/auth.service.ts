import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AUTH_CONFIG } from './../constants/auth0';
import * as auth0 from 'auth0-js';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

@Injectable()
export class AuthService {
    errorMessage: string;
    auth0 = new auth0.WebAuth({
        domain: AUTH_CONFIG.AUTH0_DOMAIN,
        clientID: AUTH_CONFIG.AUTH0_CLIENT_ID,
        redirectUri: AUTH_CONFIG.AUTH0_CALBACKURL,
        audience: `https://${AUTH_CONFIG.AUTH0_DOMAIN}/userinfo`,
        responseType: 'token id_token',
        prompt: 'select_account',
        scope: 'openid profile email'
    });
    constructor(private _router: Router) {}
    public loginUsername(username: string, password: string, success, error): void {
        this.auth0.client.login(
            {
                realm: 'podnoms-db-connection',
                username: username,
                password: password
            },
            (err, authResult) => {
                if (err) {
                    error(err);
                    console.log(err);
                    return;
                } else if (authResult && authResult.accessToken && authResult.idToken) {
                    this.setSession(authResult);
                    success(authResult);
                }
            }
        );
    }
    public signup(email: string, password: string): Observable<any> {
        return Observable.create(observer => {
            this.auth0.redirect.signupAndLogin(
                {
                    connection: 'podnoms-db-connection',
                    email,
                    password
                },
                err => {
                    if (err) {
                        observer.error(err);
                    } else observer.next();
                }
            );
        });
    }
    public resetPassword(email: string): Observable<any> {
        return Observable.create(observer => {
            this.auth0.changePassword(
                {
                    connection: 'podnoms-db-connection',
                    email
                },
                (err, resp) => {
                    if (err) {
                        console.error(err);
                        Observable.throw(err);
                    } else {
                        observer.next('success');
                    }
                }
            );
        });
    }
    public loginSocial(provider: string): void {
        this.auth0.authorize({
            connection: provider
        });
    }
    public handleAuthentication(): void {
        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.setSession(authResult);
            } else if (err) {
                this.logout();
                this._router.navigate(['/']).then(r => window.location.reload()); // TODO: Remove this for the love of baby Jesus!
                console.log(err);
            }
        });
    }
    public getToken(): string {
        if (this.isAuthenticated()) return localStorage.getItem('id_token');
        return '';
    }
    private setSession(authResult): void {
        const expiresAt = JSON.stringify(authResult.expiresIn * 1000 + new Date().getTime());
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', expiresAt);
        this._router.navigate(['/']);
    }
    public logout(): void {
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');

        this._router.navigate(['/']);
    }
    public isAuthenticated(): boolean {
        const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        return new Date().getTime() < expiresAt;
    }
}
