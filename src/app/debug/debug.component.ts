import { Component, OnInit } from '@angular/core';
import { JobService } from '../shared/services/job.service';
import { DebugService } from './debug.service';
import { SwPush } from '@angular/service-worker';
import { environment } from '../../environments/environment.prod';
import { AlertService } from '../core/alert.service';
import { UtilityService } from '../shared/services/utility.service';

@Component({
    selector: 'app-debug',
    templateUrl: './debug.component.html',
    styleUrls: ['./debug.component.scss']
})
export class DebugComponent implements OnInit {
    fileSize: number = -1;
    constructor(
        private swPush: SwPush,
        private debugService: DebugService,
        private utilityService: UtilityService,
        private jobService: JobService,
        private alertService: AlertService
    ) {}

    ngOnInit() {
        this.utilityService
            .getRemoteFileSize('https://traffic.megaphone.fm/GLT8967905844.mp3')
            .subscribe(r => (this.fileSize = r));
    }
    sendPush() {
        this.debugService
            .sendPushPessage('Hello Sailor')
            .subscribe((r: any) => console.log('debug.component.ts', 'sendPushPessage', r));
    }
    toastMe(type: string) {
        if (type === 'error') {
            this.alertService.error('Argle', 'Bargle');
        } else {
            const toast = this.alertService.info(
                'Argle',
                'Bargle',
                'https://podnomscdn.blob.core.windows.net/debugimages/entry/cached/75884b3b-911b-4227-eb81-08d67bf147a2-32x32.png',
                {
                    autoClose: true,
                    timeOut: 5000
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
