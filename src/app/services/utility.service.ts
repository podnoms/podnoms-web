import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
@Injectable({
    providedIn: 'root'
})
export class UtilityService {
    constructor(private _http: HttpClient) {}

    checkDomain(domain: string): Observable<boolean> {
        return this._http.post<boolean>(
            environment.API_HOST + '/utility/checkdomain',
            {
                hostname: domain
            }
        );
    }
}
