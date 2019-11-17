import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root'
})
export class LogService {
    constructor(private http: HttpClient) {}

    public getLogsForEntry(entryId: string): Observable<any> {
        return this.http.get<any>(
            `${environment.apiHost}/logs?entryId=${entryId}`
        );
    }
}
