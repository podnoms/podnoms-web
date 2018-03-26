import { Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { PushService } from 'app/services/push.service';

export type Permission = 'denied' | 'granted' | 'default';

@Injectable()
export class PushNotificationsService {
    permission: Permission;
    pushSupported: boolean = 'serviceWorker' in navigator && 'PushManager' in window;
    vapidPublicKey: string = 'BKrxiuL9AJo5rrKEzMQIOvIacDnbg6JI8hJiT00JfKytur395xL8CROvR_zC2XM9f5oxGiMLxpUyjgLWlEPeSbU';

    constructor(private _pushService: PushService, private _pushServiceWorker: SwPush) {}

    private _urlBase64ToUint8Array(base64String) {
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

    requestPermissions() {
        if ('Notification' in window) {
            Notification.requestPermission((status: any) => {
                console.log(
                    'push-notifications.service',
                    'requestPermissions',
                    status
                );
                this.permission = status;
            });
        }
    }

    isSupported() {
        return 'Notification' in window && this.permission == 'granted';
    }

    subscribeToServerPush() {
        console.log('PushNotificationsService', 'subscribeToServerPush', this.vapidPublicKey);
        this._pushServiceWorker.requestSubscription({
            serverPublicKey: this.vapidPublicKey
        }).then(pushSubscription => {
            console.log('PushNotificationsService', 'subscribeToServerPush', pushSubscription);
            this._pushService.addSubscriber(pushSubscription)
                .subscribe(res => {
                    console.log('PushNotificationsService', 'subscribeToServerPush', res);
                }, err => {
                    console.error('PushNotificationsService', 'subscribeToServerPush', err);
                });
        }).catch(err => {
            console.error('PushNotificationsService', 'subscribeToServerPush', err);
        });
    }

    createNotification(subject: string, text: string) {
        console.log('PushNotificationsService', 'createNotification', subject, text);
        if (this.isSupported()) {
            const options = {
                body: text,
                icon: 'https://podnoms.com/assets/img/logo-icon.png'
            };
            const n = new Notification(subject, options);
        } else {
            console.error(
                'push-notifications.service',
                'createNotification',
                'Notifications are not supported'
            );
        }
    }
}

