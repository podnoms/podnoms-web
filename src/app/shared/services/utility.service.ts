import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CheckResult } from '../../core/model/check-result';

@Injectable({
    providedIn: 'root',
})
export class UtilityService {
    constructor(private http: HttpClient) {}

    checkForDupes(
        table: string,
        field: string,
        value: string
    ): Observable<CheckResult> {
        return this.http.get<CheckResult>(
            environment.apiHost +
                `/utility/checkdupes?table=${table}&field=${field}&value=${value}`
        );
    }
    checkDomain(domain: string, requiredDomain: string): Observable<boolean> {
        return this.http.post<boolean>(
            environment.apiHost + '/utility/checkdomain',
            {
                hostname: domain,
                requiredDomain: requiredDomain,
            }
        );
    }
    checkPassword(password: string): Observable<number> {
        return this.http.post<number>(
            `${environment.apiHost}/utility/checkpassword/`,
            `"${password}"`
        );
    }
    getTemporaryPodcastImageUrl(): Observable<string> {
        return this.http.get<string>(
            `${environment.apiHost}/utility/temppodcastimage`
        );
    }
    checkAudioUrl(url: string): Observable<any> {
        return this.http.get<any>(
            `${environment.apiHost}/urlprocess/validate?url=${url}`
        );
    }
    checkForApiServer(): Observable<any> {
        return this.http.get(`${environment.apiHost}/ping`, {
            responseType: 'text',
        });
    }
    getRemoteFileSize(url: string): Observable<number> {
        return this.http.get<number>(
            `${environment.apiHost}/utility/filesize?url=${url}`
        );
    }
}
