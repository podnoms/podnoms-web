import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root'
})
export class BoilerplateService {
    constructor(private httpClient: HttpClient) {}

    getBoilerplate(key: string): Observable<string> {
        return this.httpClient.get(
            `${environment.apiHost}/boilerplate?key=${key}`,
            { responseType: 'text' }
        );
    }
}
