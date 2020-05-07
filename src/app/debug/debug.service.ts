import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { NgxFancyLoggerService } from 'ngx-fancy-logger';

@Injectable({
    providedIn: 'root'
})
export class DebugService {
    constructor(
        private http: HttpClient,
        private logger: NgxFancyLoggerService
    ) {}

    getDebugInfo(): Observable<string> {
        return this.http.get<string>(`${environment.apiHost}/debug`);
    }
    ping(): Observable<string> {
        return this.http.get<string>(`${environment.apiHost}/ping`);
    }
    sendPushPessage(message: string): Observable<string> {
        this.logger.debug('debug.service', 'sendPushMessage', message);
        return this.http.get<string>(
            `${environment.apiHost}/debug/serverpush?message=${message}`
        );
    }
}
