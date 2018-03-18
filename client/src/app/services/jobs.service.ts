import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import { environment } from 'environments/environment';

@Injectable()
export class JobsService {
    constructor(private _http: AuthHttp) { }

    processOrphans(): Observable<Response> {
        return this._http.get(environment.API_HOST + '/job/processorphans');
    }

    processPlaylists(): Observable<Response> {
    return this._http.get(environment.API_HOST + '/job/processplaylists');
    }
    updateYouTubeDl(): Observable<Response> {
        return this._http.get(environment.API_HOST + '/job/updateyoutubedl');
    }
}
