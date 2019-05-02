import { Injectable } from '@angular/core';
import { AuthResponseModel } from './models/auth-response.model';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthApiProxyService {
    /**
     * @description
     * Contains methods for retrieving jwt tokens from the podnoms api server
     */
    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    constructor(private http: HttpClient) {}
    login(username: string, password: string): Observable<AuthResponseModel> {
        return this.http.post<AuthResponseModel>(
            environment.apiHost + '/auth/login',
            JSON.stringify({ username, password }),
            this.httpOptions
        );
    }
    facebookLogin(accessToken: string): Observable<AuthResponseModel> {
        const body = JSON.stringify({ accessToken });
        return this.http.post<AuthResponseModel>(
            environment.apiHost + '/externalauth/facebook',
            body,
            this.httpOptions
        );
    }
    googleLogin(accessToken: string) {
        const body = JSON.stringify({ accessToken });
        return this.http.post<AuthResponseModel>(
            environment.apiHost + '/externalauth/google',
            body,
            this.httpOptions
        );
    }
    public register(email: string, password: string): Observable<AuthResponseModel> {
        const body = JSON.stringify({
            email,
            password
        });
        return this.http.post<AuthResponseModel>(
            environment.apiHost + '/accounts',
            body,
            this.httpOptions
        );
    }
    public resetPassword(
        email: string,
        newPassword: string,
        newPasswordRepeat: string,
        code: string
    ): Observable<Response> {
        const body = JSON.stringify({
            email: email,
            password: newPassword,
            confirmPassword: newPasswordRepeat,
            code: code
        });
        return this.http.post<Response>(
            environment.apiHost + '/auth/reset',
            body,
            this.httpOptions
        );
    }
    public forgotPassword(userName: string): Observable<Response> {
        const body = JSON.stringify({
            email: userName
        });
        return this.http.post<Response>(
            environment.apiHost + '/auth/forgot',
            body,
            this.httpOptions
        );
    }
}
