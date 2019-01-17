import { Injectable, NgZone } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { interval } from 'rxjs';
import { AlertService } from '../../core/alert.service';

@Injectable({
    providedIn: 'root'
})
export class UpdateService {
    constructor(public updates: SwUpdate, public alertService: AlertService) {
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
        const toast = this.alertService.success('A new version of PodNoms is available!', 'Click here to reload...');
        toast.click.subscribe(e => {
            this.updates.activateUpdate().then(() => document.location.reload());
        });
        // toast.clickIcon.subscribe(event => {
        //     this.updates.activateUpdate().then(() => document.location.reload());
        // });
    }
}
