import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UtilityService {
    constructor(private _http: HttpClient) {}

    checkDomain(domain: string): Observable<boolean> {
        return this._http.post<boolean>(environment.apiHost + '/utility/checkdomain', {
            hostname: domain
        });
    }
    checkPassword(password: string): Observable<number> {
        return this._http.post<number>(
            `${environment.apiHost}/utility/checkpassword/`,
            `"${password}"`
        );
    }
    getTemporaryPodcastImageUrl(): Observable<string> {
        return this._http.get<string>(`${environment.apiHost}/utility/temppodcastimage`);
    }
}
