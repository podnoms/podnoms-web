import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SharingService {
    constructor(private http: HttpClient) {}
    getSharingLink(id: string): Observable<string> {
        return this.http
            .post<any>(`${environment.apiHost}/sharing`, {
                id: id
            })
            .map(r => r.url);
    }
    getSharingItem(sharingLink: string): Observable<any> {
        return this.http.get<any>(`${environment.apiHost}/pub/sharing/${sharingLink}`);
    }
}
