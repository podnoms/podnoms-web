import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notification } from '../models/notification';
import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class NotificationDataService {
    constructor(private http: HttpClient) {}

    saveChanges(notification: Notification): Observable<Notification> {
        return this.http.post<Notification>(`${environment.apiHost}/notification`, notification);
    }
    getTypes(): Observable<string> {
        return this.http.get<string>(`${environment.apiHost}/notification/types`);
    }
    getConfig(type: string): Observable<Notification> {
        return this.http.get<Notification>(
            `${environment.apiHost}/notification/config?type=${type}`
        );
    }
}
