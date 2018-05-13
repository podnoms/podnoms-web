import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PushRegistrationService {
    private API_URL: string;
    constructor(private _http: HttpClient) {
        this.API_URL = environment.API_HOST;
    }

    urlBase64ToUint8Array(base64String) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
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

    addSubscriber(subscription) {
        const url = `${this.API_URL}/webpush/subscribe`;
        return this._http.post(url, subscription).catch(this.handleError);
    }

    deleteSubscriber(subscription) {
        const url = `${this.API_URL}/webpush`;
        const body = {
            action: 'unsubscribe',
            subscription: subscription
        };

        return this._http
            .post(url, JSON.stringify(body))
            .catch(this.handleError);
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
