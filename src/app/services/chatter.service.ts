import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ChatterService {
    constructor(private _http: HttpClient) {}

    ping(message: string): any {
        return this._http.post(
            environment.API_HOST + '/chatter/ping',
            JSON.stringify({ message: message })
        );
    }
}
