import { Injectable, NgZone } from '@angular/core';
import { Auth0Vars } from '../constants/auth0';
import { Router } from '@angular/router';
import Auth0Lock from 'auth0-lock';

import { Observable } from 'rxjs/Observable';
import { AuthHttp, JwtHelper, tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
    profile: any;
    private roles: string[] = [];

    lock = new Auth0Lock(Auth0Vars.AUTH0_CLIENT_ID, Auth0Vars.AUTH0_DOMAIN, {
        auth: {
            params: {
                callbackURL: 'http://dev.podnoms.com:4200/',
                responseType: 'token',
                scope: 'openid name email picture'
            },
            responseType: 'token'
        },
        theme: {
            logo: 'https://podnomscdn.blob.core.windows.net/static/images/logo.png',
            primaryColor: '#ff5500'
        },
    });

    constructor() {
        this.readUserFromLocalStorage();
        this.lock.on('authenticated', (authResult) => this.onUserAuthenticated(authResult));
    }

    private onUserAuthenticated(authResult) {
        localStorage.setItem('token', authResult.idToken);

        this.lock.getUserInfo(authResult.accessToken, (error, profile) => {
            if (error) {
                throw error;
            }
            localStorage.setItem('profile', JSON.stringify(profile));
            this.readUserFromLocalStorage();
            window.location.reload();
        });
    }

    private readUserFromLocalStorage() {
        this.profile = JSON.parse(localStorage.getItem('profile'));
        const token = localStorage.getItem('token');
        if (token) {
            const jwtHelper = new JwtHelper();
            const decodedToken = jwtHelper.decodeToken(token);
            this.roles = decodedToken['https://vega.com/roles'] || [];
        }
    }

    public isInRole(roleName) {
        return this.roles.indexOf(roleName) > -1;
    }

    public login() {
        this.lock.show();
    }

    public authenticated() {
        return tokenNotExpired('token');
    }

    public logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('profile');
        this.profile = null;
        this.roles = [];
    }
}
