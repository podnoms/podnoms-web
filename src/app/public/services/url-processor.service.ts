import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root',
})
export class UrlProcessorService {
    constructor(private httpClient: HttpClient) {}

    public validateUrl(url: string): Observable<any> {
        return this.httpClient.get(
            `${environment.apiHost}/pub/process/validate?url=${url}`
        );
    }
    public processUrl(url: string): Observable<any> {
        return this.httpClient.get(
            `${environment.apiHost}/pub/process/process?url=${url}`
        );
    }
}
