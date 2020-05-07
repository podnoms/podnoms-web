import { Injectable, NgZone } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { interval } from 'rxjs';
import { AlertService } from '../../core/alerts/alert.service';
import { NgxFancyLoggerService } from 'ngx-fancy-logger';

@Injectable({
    providedIn: 'root'
})
export class UpdateService {
    constructor(
        public updates: SwUpdate,
        public alertService: AlertService,
        protected logger: NgxFancyLoggerService
    ) {
        if (updates.isEnabled) {
            interval(6 * 60 * 60).subscribe(() => {
                updates.checkForUpdate().then(() => {});
            });
        }
    }

    public checkForUpdates(): void {
        this.updates.available.subscribe(event => this.promptUser());
    }

    private promptUser(): void {
        this.logger.debug('update.service', 'Updating to latest version');
        const toast = this.alertService.success(
            'A new version of PodNoms is available!',
            'Click here to reload...',
            '',
            { autoClose: false }
        );
        toast.click.subscribe((e: any) => {
            this.updates
                .activateUpdate()
                .then(() => document.location.reload());
        });
        // toast.clickIcon.subscribe(event => {
        //     this.updates.activateUpdate().then(() => document.location.reload());
        // });
    }
}
