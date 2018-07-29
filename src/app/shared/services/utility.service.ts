import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CheckResult } from '../../core/model/check-result';

@Injectable({
    providedIn: 'root'
})
export class UtilityService {
    constructor(private _http: HttpClient) {}

    checkForDupes(table: string, field: string, value: string): Observable<CheckResult> {
        return this._http.get<CheckResult>(
            environment.apiHost +
                `/utility/checkdupes?table=${table}&field=${field}&value=${value}`
        );
    }
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
