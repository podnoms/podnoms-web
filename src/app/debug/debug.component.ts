import { Component } from '@angular/core';
import { AlertService } from 'app/core/alerts/alert.service';
import { SignalRService } from 'app/shared/services/signal-r.service';
import { NGXLogger } from 'ngx-logger';
@Component({
    selector: 'app-debug',
    templateUrl: './debug.component.html',
    styleUrls: ['./debug.component.scss'],
})
export class DebugComponent {
    constructor(
        private debugHub: SignalRService,
        private alertService: AlertService,
        private logger: NGXLogger
    ) {}
    doSuccess() {
        this.alertService.success(
            'Hello Sailor',
            'I am a HUGE success',
            undefined
        );
    }
    doError() {
        this.alertService.error('Hello Sailor', 'I am a HUGE failure', {
            autoClose: false,
            showCloseButton: true,
        });
    }
    doInfo() {
        this.alertService.info('Hello Sailor', 'I am a HUGE nerd', {
            showProgressBar: true,
            timeOut: 5000,
            autoClose: true,
        });
    }
    doCallback() {
        const toast = this.alertService.info(
            'Hello Sailor',
            'I can be clicked',
            {
                showProgressBar: true,
                timeOut: 5000,
                autoClose: true,
            }
        );
        toast.click.subscribe((e: any) => {
            this.logger.debug('debug.component', 'clicked', e);
        });
    }

    startSignalRHubs() {
        console.log('debug.component', 'startSignalRHubs');
        this.debugHub.init('audioprocessing').then((listener) => {
            listener
                .on<any>('debug', 'debug-updates')
                .subscribe((result: any) => {
                    console.log('debug.component', 'realtime message', result);
                });
        });
    }
}
