import { environment } from 'environments/environment';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Rx';
import { AuthService } from 'angularx-social-login';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/filter';
import { Headers, RequestOptions } from '@angular/http';
import { BaseService } from './base.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProfileModel } from '../models/profile.model';

@Injectable()
export class PodnomsAuthService extends BaseService {
    private _authNavStatusSource = new BehaviorSubject<boolean>(false);
    authNavStatus$ = this._authNavStatusSource.asObservable();
    private _loggedIn = false;
    user: ProfileModel;
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };
    constructor(
        private _router: Router,
        private _http: HttpClient,
        private _authService: AuthService,
        private zone: NgZone
    ) {
        super();
        this._loggedIn = !!localStorage.getItem('auth_token');
        // ?? not sure if this the best way to broadcast the status but seems to resolve issue on page refresh where auth status is lost in
        // header component resulting in authed user nav links disappearing despite the fact user is still logged in
        this._authNavStatusSource.next(this._loggedIn);
    }
    setUser(user: ProfileModel) {
        this.user = user;
    }
    getUser() {
        return this.user;
    }
    isAuthenticated() {
        return this._loggedIn;
    }
    getToken() {
        return localStorage.getItem('auth_token');
    }
    login(userName, password) {
        return this._http
            .post(
                environment.API_HOST + '/auth/login',
                JSON.stringify({ userName, password }),
                this.httpOptions
            )
            .map((res) => {
                localStorage.setItem('auth_token', res['auth_token']);
                this._loggedIn = true;
                this._authNavStatusSource.next(true);
                return true;
            })
            .catch(this.handleError);
    }
    facebookLogin(accessToken: string) {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const body = JSON.stringify({ accessToken });
        return this._http
            .post<string>(
                environment.API_HOST + '/externalauth/facebook',
                body,
                {
                    headers
                }
            )
            .map((res) => {
                localStorage.setItem('auth_token', res['auth_token']);
                this._loggedIn = true;
                this._authNavStatusSource.next(true);
                return true;
            })
            .catch(this.handleError);
    }
    googleLogin(accessToken: string) {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const body = JSON.stringify({ accessToken });
        return this._http
            .post<string>(environment.API_HOST + '/externalauth/google', body, {
                headers
            })
            .map((res) => {
                localStorage.setItem('auth_token', res['auth_token']);
                this._loggedIn = true;
                this._authNavStatusSource.next(true);
                return true;
            })
            .catch(this.handleError);
    }
    public signup(email: string, password: string): Observable<ProfileModel> {
        const body = JSON.stringify({
            email,
            password
        });
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };

        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });

        return this._http
            .post<ProfileModel>(
                environment.API_HOST + '/accounts',
                body,
                this.httpOptions
            )
            .map((res) => true)
            .catch(this.handleError);
    }
    public logout() {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('audio_state');
        this._loggedIn = false;
        setTimeout(() => {
            this._router.navigate(['/']);
            window.location.reload(true);
        }, 0);
    }
    public resetPassword(userName: string) {}
    public loginSocial(provider: string): void {}
}
