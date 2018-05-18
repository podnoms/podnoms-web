import { Injectable, OnInit } from '@angular/core';
import { BaseService } from '../core/base.service';
import { Provider } from '@angular/compiler/src/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthResponseModel } from './models/auth-response.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { ProfileService } from './profile.service';
import { Profile } from '../core';

@Injectable({
    providedIn: 'root'
})
export class AuthService extends BaseService {
    private _authNavStatusSource = new BehaviorSubject<boolean>(false);
    private authNavStatus$ = this._authNavStatusSource.asObservable();

    private _profileSource = new BehaviorSubject<Profile>(null);
    profile$ = this._profileSource.asObservable();

    private bootstrapped: boolean = false;

    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    constructor(
        private router: Router,
        private http: HttpClient,
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
    socialLogin(provider: string) /*: Observable<any>*/ {}
    login(userName: string, password: string): Observable<boolean> {
        return this.http
            .post<AuthResponseModel>(
                environment.apiHost + '/auth/login',
                JSON.stringify({ userName, password }),
                this.httpOptions
            )
            .map(res => {
                localStorage.setItem('auth_token', res.auth_token);
                this.bootstrap();
                return true;
            });
    }
    logout() {
        localStorage.clear();
        this.router.navigate(['']);
    }
}
