import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import * as firebase from 'firebase';
import 'rxjs/add/operator/take';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { PushRegistrationService } from 'app/services/push-registration.service';

@Injectable()
export class MessagingService {
    messaging = firebase.messaging();
    currentMessage = new BehaviorSubject(null);

    constructor(
        private db: AngularFireDatabase,
        private afAuth: AngularFireAuth,
        private _pushRegistrationServer: PushRegistrationService
    ) {
        this.messaging.usePublicVapidKey(
            'BKyhUqIVZLauKNA-DXPXbIVLj5XiWurHbRV_0Rd3BOjY5cU9GOrd5ptXVJ2CNExxdveKYzZevrep2CflKeqkyqo'
        );
    }

    private updateToken(token) {
        this.afAuth.authState.take(1).subscribe(user => {
            if (!user) return;

            const data = { [user.uid]: token };
            this.db.object('fcmTokens/').update(data);
        });
        const registration = {
            endpoint: token,
            keys: {
                p256dh: token
            }
        };
        this._pushRegistrationServer.addSubscriber(registration)
            .subscribe(e => console.log('messaging.service', 'updateToken', 'addSubscriber', e));
    }

    public getPermission() {
        this.messaging
            .requestPermission()
            .then(() => {
                const token = this.messaging.getToken();
                return token;
            })
            .then(token => {
                this.updateToken(token);
            })
            .catch(err => {
                console.error('Unable to get permission to notify', err);
            });
    }

    receiveMessage() {
        this.messaging.onMessage(payload => {
            this.currentMessage.next(payload);
        });
    }
}
