import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/catch';

@Injectable({
    providedIn: 'root'
})
export class PushRegistrationService {
    constructor(private _http: HttpClient) {}

    urlBase64ToUint8Array(base64String) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);
        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }

    addSubscriber(registration) {
        console.log('push-registration.service', 'addSubscriber', registration);
        const url = `${environment.apiHost}/webpush/subscribe`;
        return this._http.post(url, registration).catch(this.handleError);
    }

    deleteSubscriber(subscription) {
        const url = `${environment.apiHost}/webpush`;
        const body = {
            action: 'unsubscribe',
            subscription: subscription
        };

        return this._http.post(url, JSON.stringify(body)).catch(this.handleError);
    }

    private handleError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            errMsg = `${error.statusText || 'Network error'}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        return Observable.throw(errMsg);
    }
}
