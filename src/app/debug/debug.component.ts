import { Component, OnInit } from '@angular/core';
import { AlertService } from 'app/core/alerts/alert.service';
import { NGXLogger } from 'ngx-logger';
@Component({
    selector: 'app-debug',
    templateUrl: './debug.component.html',
    styleUrls: ['./debug.component.scss'],
})
export class DebugComponent implements OnInit {
    constructor(
        private alertService: AlertService,
        private logger: NGXLogger
    ) {}

    ngOnInit() {}

    doSuccess() {
        this.alertService.success(
            'Hello Sailor',
            'I am a HUGE success',
            undefined,
            {
                showProgressBar: true,
                timeOut: 50000,
                autoClose: true,
                showCloseButton: false,
            }
        );
    }
    doError() {
        this.alertService.error(
            'Hello Sailor',
            'I am a HUGE failure',
            undefined,
            {
                autoClose: false,
                showCloseButton: true,
            }
        );
    }
    doInfo() {
        this.alertService.info('Hello Sailor', 'I am a HUGE nerd', undefined, {
            showProgressBar: true,
            timeOut: 5000,
            autoClose: true,
        });
    }
    doCallback() {
        const toast = this.alertService.info(
            'Hello Sailor',
            'I can be clicked',
            undefined,
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
}
