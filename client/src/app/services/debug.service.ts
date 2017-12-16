import { environment } from 'environments/environment';
import { Observable } from 'rxjs/Observable';
import { AuthHttp } from 'angular2-jwt';
import { HubConnection } from '@aspnet/signalr-client';
import { Injectable } from '@angular/core';

@Injectable()
export class DebugService {
    constructor(private _http: AuthHttp) {}

    sendRealtime(message: string): any {
        return this._http.post(environment.API_HOST + '/debug/realtime', JSON.stringify(message));
    }

    getDebugInfo(): Observable<string> {
        return this._http.get(environment.API_HOST + '/debug').map(r => r.json());
    }

    ping(): Observable<string> {
        return this._http.get(environment.API_HOST + '/debug/ping').map(r => r.text());
    }
}
