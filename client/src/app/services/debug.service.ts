import { environment } from 'environments/environment';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DebugService {
    constructor(private _http: HttpClient) {}

    sendRealtime(message: string): any {
        return this._http.post(
            environment.API_HOST + '/debug/realtime',
            JSON.stringify(message)
        );
    }

    getDebugInfo(): Observable<string> {
        return this._http.get<string>(environment.API_HOST + '/debug');
    }

    ping(): Observable<string> {
        return this._http.get<string>(environment.API_HOST + '/ping');
    }
    sendPush(): Observable<string> {
        return this._http.get<string>(
            environment.API_HOST + '/debug/serverpush'
        );
    }
}
