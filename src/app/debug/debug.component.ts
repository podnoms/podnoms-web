import { Component, OnInit } from '@angular/core';
import { JobService } from '../shared/services/job.service';
import { ToastService } from '../core';
import { DebugService } from './debug.service';
import { SwPush } from '@angular/service-worker';
import { environment } from '../../environments/environment.prod';

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
        private toastService: ToastService
    ) {}

    ngOnInit() {}
    sendPush() {
        this.swPush
            .requestSubscription({ serverPublicKey: environment.vapidPublicKey })
            .then(sub => {
                this.debugService
                    .sendPushPessage('Hello Sailor')
                    .subscribe((r: any) => console.log('debug.component.ts', 'sendPushPessage', r));
            })
            .catch(err => console.error('debug.component', 'swPush', err));
    }
    deleteOrphans() {
        this.jobService.deleteOrphans().subscribe(r => {
            this.toastService.showToast('Success', 'Job successfully queued');
        });
    }
    processMissing() {
        this.jobService.processMissing().subscribe(r => {
            this.toastService.showToast('Success', 'Job successfully queued');
        });
    }
    updateImages() {
        this.jobService.updateImages().subscribe(r => {
            this.toastService.showToast('Success', 'Job successfully queued');
        });
    }
}
