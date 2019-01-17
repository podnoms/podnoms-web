import { Component, OnInit } from '@angular/core';
import { JobService } from '../shared/services/job.service';
import { DebugService } from './debug.service';
import { SwPush } from '@angular/service-worker';
import { environment } from '../../environments/environment.prod';
import { AlertService } from '../core/alert.service';

@Component({
    selector: 'app-debug',
    templateUrl: './debug.component.html',
    styleUrls: ['./debug.component.scss']
})
export class DebugComponent implements OnInit {
    constructor(
        private swPush: SwPush,
        private debugService: DebugService,
        private jobService: JobService,
        private alertService: AlertService
    ) {}

    ngOnInit() {}
    sendPush() {
        this.debugService
            .sendPushPessage('Hello Sailor')
            .subscribe((r: any) => console.log('debug.component.ts', 'sendPushPessage', r));
    }
    toastMe(type: string) {
        if (type === 'error') {
            this.alertService.error(
                'Argle',
                'Bargle'
            );
        } else {
            const toast = this.alertService.info(
                'Argle',
                'Bargle',
                undefined,
                // 'https://podnomscdn.blob.core.windows.net/debugimages/entry/cached/75884b3b-911b-4227-eb81-08d67bf147a2-32x32.png',
                {
                    autoClose: false
                }
            );
            toast.click.subscribe(() => alert('Toasty!'));
        }
    }
    deleteOrphans() {
        this.jobService.deleteOrphans().subscribe(r => {
            this.alertService.info('Success', 'Job successfully queued');
        });
    }
    processMissing() {
        this.jobService.processMissing().subscribe(r => {
            this.alertService.info('Success', 'Job successfully queued');
        });
    }
    updateImages() {
        this.jobService.updateImages().subscribe(r => {
            this.alertService.info('Success', 'Job successfully queued');
        });
    }
}
