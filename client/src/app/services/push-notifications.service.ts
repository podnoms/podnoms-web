import { Injectable } from '@angular/core';

export type Permission = 'denied' | 'granted' | 'default';

@Injectable()
export class PushNotificationsService {
    permission: Permission;

    constructor() {}
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
    createNotification(subject: string, text: string) {
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
