import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

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
}
