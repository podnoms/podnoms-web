import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { environment } from 'environments/environment';

@Injectable()
export class PushRegistrationService {
    private API_URL: string;
    constructor(private http: AuthHttp) {
        this.API_URL = environment.API_HOST;
    }

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

    addSubscriber(subscription) {
        console.log('[Push Service] Adding subscriber')
        const url = `${this.API_URL}/webpush/subscribe`;
        return this.http
            .post(url, subscription)
            .catch(this.handleError);
    }

    deleteSubscriber(subscription) {

        const url = `${this.API_URL}/webpush`;
        console.log('[Push Service] Deleting subscriber')

        let body = {
            action: 'unsubscribe',
            subscription: subscription
        }

        return this.http
            .post(url, body)
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
