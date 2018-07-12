import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class JobService {
    constructor(private http: HttpClient) {}
    deleteOrphans(): Observable<Response> {
        return this.http.get<Response>(`${environment.apiHost}/job/deleteorphans`);
    }
    processPlaylists(): Observable<Response> {
        return this.http.get<Response>(`${environment.apiHost}/job/processplaylists`);
    }
    processPlaylistItems(): Observable<Response> {
        return this.http.get<Response>(`${environment.apiHost}/job/processplaylistitems`);
    }
    processMissing(): Observable<Response> {
        return this.http.get<Response>(`${environment.apiHost}/job/processmissing`);
    }
    updateYouTubeDl(): Observable<Response> {
        return this.http.get<Response>(`${environment.apiHost}/job/updateyoutubedl`);
    }
}
