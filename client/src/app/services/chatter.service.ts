import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class ChatterService {
    constructor(private _http: AuthHttp) {}

    ping(message: string): any {
        return this._http.post(
            environment.API_HOST + '/chatter/ping',
            JSON.stringify({ message: message })
        );
    }
}
