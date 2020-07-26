import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Server } from 'http';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { SiteMessage } from 'app/core';

@Injectable({
    providedIn: 'root',
})
export class SiteMessagesService {
    constructor(private httpClient: HttpClient) {}

    getShowcase(): Observable<SiteMessage> {
        return this.httpClient.get<SiteMessage>(
            `${environment.apiHost}/sitemessages`
        );
    }
    getBanner(): Observable<SiteMessage> {
        return this.httpClient.get<SiteMessage>(
            `${environment.apiHost}/sitemessages/banners`
        );
    }
}
