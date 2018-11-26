import { Component, OnInit } from '@angular/core';
import { JobService } from '../shared/services/job.service';
import { ToastService } from '../core';
import { DebugService } from './debug.service';

@Component({
    selector: 'app-debug',
    templateUrl: './debug.component.html',
    styleUrls: ['./debug.component.scss']
})
export class DebugComponent implements OnInit {

    constructor(
        private debugService: DebugService,
        private jobService: JobService,
        private toastService: ToastService
    ) {}

    ngOnInit() {}
    sendPush() {
        this.debugService.sendPushPessage('Hello Sailor').subscribe(r => alert(r));
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
