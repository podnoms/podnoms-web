import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {AuthService} from './auth.service';
import {Observable} from "rxjs";
import {environment} from '../../environments/environment';

@Injectable()
export class HttpService {
    constructor(private _http: Http, private _authService: AuthService) {

    }

    createHeaders(): Headers {
        const headers = new Headers({'Content-Type': 'application/json'});
        // headers.append('Authorization', 'Bearer ' +
        //     this._authService.to());
        return headers;
    }

    get(url): Observable<Response> {
        return this._http.get('api' + url, {
            headers: this.createHeaders()
        });
    }

    post(url, data): Observable<Response> {
        return this._http.post('api'  + url, data, {
            headers: this.createHeaders()
        });
    }

    delete(url: string): Observable<Response> {
        return this._http.delete('api'  + url, {
            headers: this.createHeaders()
        });
    }
}
