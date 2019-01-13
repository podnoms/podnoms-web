import { Injectable, NgZone } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { NotificationsService } from 'angular2-notifications';
import { interval } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UpdateService {
    constructor(swUpdate: SwUpdate, ngZone: NgZone, notificationsService: NotificationsService) {
        console.log('update.service', 'Subscribing to updates');
        if (!swUpdate.isEnabled) {
            console.error('Update service is currently unavailable');
        }
        swUpdate.available.subscribe(evt => {
            // an update is available, add some logic here.
            console.log('update.service', 'Update detected', evt);
            const toast = notificationsService.success(
                'A new version of PodNoms is available!',
                'Click here to reload...',
                {
                    timeOut: 0,
                    showProgressBar: false,
                    pauseOnHover: true,
                    clickToClose: false,
                    clickIconToClose: true
                }
            );

            toast.clickIcon.subscribe(event => {
                window.location.reload();
            });
        });
        console.log('update.service', 'Scheduling updates');
        ngZone.runOutsideAngular(() => {
            interval(6000).subscribe(() => {
                console.log('update.service', 'Checking for updates');
                ngZone.run(() => swUpdate.checkForUpdate());
            });
        });
    }
}
