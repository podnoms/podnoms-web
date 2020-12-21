import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ApiKeyService {
    constructor(private httpClient: HttpClient) {}

    addNewApiKey(type: string, key: string, url: string): Observable<any> {
        return this.httpClient.post<any>(`${environment.apiHost}/apikey/addservicekey`, {
            type: type,
            key: key,
            url: url,
        });
    }
}
