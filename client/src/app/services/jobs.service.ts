import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class JobsService {
    constructor(private _http: HttpClient) {}

    processOrphans(): Observable<Response> {
        return this._http.get<Response>(
            environment.API_HOST + '/job/processorphans'
        );
    }
    processPlaylists(): Observable<Response> {
        return this._http.get<Response>(
            environment.API_HOST + '/job/processplaylists'
        );
    }
    updateYouTubeDl(): Observable<Response> {
        return this._http.get<Response>(
            environment.API_HOST + '/job/updateyoutubedl'
        );
    }
}
