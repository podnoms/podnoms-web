import { Injectable } from '@angular/core';
import { AuthResponseModel } from './models/auth-response.model';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PodnomsApiAuthService {
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
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const body = JSON.stringify({ accessToken });
        return this.http.post<AuthResponseModel>(
            environment.apiHost + '/externalauth/facebook',
            body,
            { headers: headers }
        );
    }
}
