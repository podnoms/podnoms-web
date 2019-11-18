import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
    Notification,
    NotificationLog
} from '../../../core/model/notification';
import { environment } from '../../../../environments/environment';
import { take } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class NotificationDataService {
    constructor(private http: HttpClient) {}

    saveChanges(notification: Notification): Observable<Notification> {
        return this.http.post<Notification>(
            `${environment.apiHost}/notification`,
            notification
        );
    }
    getTypes(): Observable<string> {
        return this.http.get<string>(
            `${environment.apiHost}/notification/types`
        );
    }
    getConfig(type: string): Observable<Notification> {
        return this.http.get<Notification>(
            `${environment.apiHost}/notification/config?type=${type}`
        );
    }
    deleteNotification(notification: Notification): any {
        return this.http.delete(
            `${environment.apiHost}/notification?id=${notification.id}`
        );
    }
    getLogs(id: string): Observable<NotificationLog[]> {
        return this.http.get<NotificationLog[]>(
            `${environment.apiHost}/notification/logs?notificationId=${id}`
        );
    }
    getLastRunStatus(id: string): Observable<NotificationLog> {
        return this.http
            .get<NotificationLog>(
                `${environment.apiHost}/notification/logs?notificationId=${id}&take=1`
            )
            .pipe(take(1));
    }
}
