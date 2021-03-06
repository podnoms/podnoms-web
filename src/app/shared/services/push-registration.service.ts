import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { NGXLogger } from 'ngx-logger';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class PushRegistrationService {
    constructor(private http: HttpClient, protected logger: NGXLogger) {}

    urlBase64ToUint8Array(base64String: string) {
        const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
        const base64 = (base64String + padding)
            .replace(/\-/g, '+')
            .replace(/_/g, '/');
        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);
        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }

    addSubscriber(registration: PushSubscriptionJSON): Observable<any> {
        this.logger.debug(
            'push-registration.service',
            'addSubscriber',
            registration
        );
        return this.http
            .post<any>(`${environment.apiHost}/webpush/subscribe`, registration)
            .pipe(catchError(this.handleError));
    }

    deleteSubscriber(subscription: PushSubscriptionJSON) {
        const url = `${environment.apiHost}/webpush`;
        const body = {
            action: 'unsubscribe',
            subscription: subscription,
        };
        return this.http.post(url, body).pipe(catchError(this.handleError));
    }

    private handleError(error: Response | any) {
        this.logger.error(
            'push-registration.service',
            'Error registering for push',
            error
        );
        let errMsg: string;
        if (error instanceof Response) {
            errMsg = `${error.statusText || 'Network error'}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        return throwError(errMsg);
    }
}
