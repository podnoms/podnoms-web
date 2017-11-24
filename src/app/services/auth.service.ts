import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AUTH_CONFIG } from './../constants/auth0';
import * as auth0 from 'auth0-js';

@Injectable()
export class AuthService {
    // Configure Auth0
    auth0 = new auth0.WebAuth({
        domain: AUTH_CONFIG.domain,
        clientID: AUTH_CONFIG.clientID,
        redirectUri: AUTH_CONFIG.callbackURL,
        audience: `https://${AUTH_CONFIG.domain}/userinfo`,
        responseType: 'token id_token',
        scope: 'openid'
    });

    constructor(private router: Router) {}

    public login(username: string, password: string, success, error): void {
        this.auth0.client.login(
            {
                realm: 'podnoms-db-connection',
                username,
                password
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

    public signup(email: string, password: string): void {
        this.auth0.redirect.signupAndLogin(
            {
                connection: 'podnoms-db-connection',
                email,
                password
            },
            err => {
                if (err) {
                    console.log(err);
                    alert(`Error: ${err.description}. Check the console for further details.`);
                    return;
                }
            }
        );
    }

    public loginWithGoogle(): void {
        this.auth0.authorize({
            connection: 'google-oauth2'
        });
    }

    public handleAuthentication(): void {
        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.setSession(authResult);
            } else if (err) {
                this.router.navigate(['/home']);
                console.log(err);
                alert(`Error: ${err.error}. Check the console for further details.`);
            }
        });
    }

    public getToken(): String {
        if (this.isAuthenticated()) return localStorage.getItem('access_token');

        return '';
    }
    private setSession(authResult): void {
        // Set the time that the access token will expire at
        const expiresAt = JSON.stringify(authResult.expiresIn * 1000 + new Date().getTime());
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', expiresAt);
        this.router.navigate(['home']);
    }

    public logout(): void {
        // Remove tokens and expiry time from localStorage
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        // Go back to the home route
        this.router.navigate(['/home']);
    }

    public isAuthenticated(): boolean {
        // Check whether the current time is past the
        // access token's expiry time
        const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        return new Date().getTime() < expiresAt;
    }
}
