import { Injectable, NgZone } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { NotificationsService } from 'angular2-notifications';
import { interval } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UpdateService {
    constructor(public updates: SwUpdate, public notifier: NotificationsService) {
        if (updates.isEnabled) {
            console.log('update.service', 'Auto updates are enabled');
            interval(6 * 60 * 60).subscribe(() => {
                console.log('update.service', 'Checking for updates');
                updates.checkForUpdate().then(() => {});
            });
        } else {
            console.log('update.service', 'Auto updates are currently unavailable');
        }
    }

    public checkForUpdates(): void {
        this.updates.available.subscribe(event => this.promptUser());
    }

    private promptUser(): void {
        console.log('update.service', 'Updating to latest version');
        const toast = this.notifier.success('A new version of PodNoms is available!', 'Click here to reload...', {
            timeOut: 0,
            showProgressBar: false,
            pauseOnHover: true,
            clickToClose: true,
            clickIconToClose: true
        });
        toast.click.subscribe((e) => {
            this.updates.activateUpdate().then(() => document.location.reload());
        });
        toast.clickIcon.subscribe(event => {
            this.updates.activateUpdate().then(() => document.location.reload());
        });
    }
}
