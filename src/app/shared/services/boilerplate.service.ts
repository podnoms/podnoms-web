import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { Boilerplate } from 'app/core/model/boilerplate';

@Injectable({
    providedIn: 'root'
})
export class BoilerplateService {
    constructor(private httpClient: HttpClient) {}

    getBoilerplate(key: string): Observable<Boilerplate> {
        return this.httpClient.get<Boilerplate>(
            `${environment.apiHost}/boilerplate?key=${key}`
        );
    }
}
