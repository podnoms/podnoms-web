import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Server } from 'http';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { ServerShowcase } from 'app/core';

@Injectable({
    providedIn: 'root',
})
export class ServerShowcaseService {
    constructor(private httpClient: HttpClient) {}

    getShowcase(): Observable<ServerShowcase> {
        return this.httpClient.get<ServerShowcase>(
            `${environment.apiHost}/servershowcases`
        );
    }
}
