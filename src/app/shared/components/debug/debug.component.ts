import { Component, OnInit } from '@angular/core';
import { DebugService } from '../../services/debug.service';
import { JobService } from '../../services/job.service';

@Component({
    selector: 'app-debug',
    templateUrl: './debug.component.html',
    styleUrls: ['./debug.component.scss']
})
export class DebugComponent implements OnInit {
    constructor(private debugService: DebugService, private jobService: JobService) {}

    ngOnInit() {}
    sendPush() {
        this.debugService.sendPushPessage('Hello Sailor').subscribe(r => alert(r));
    }
    processMissing() {
        this.jobService.processMissing().subscribe(r => alert(r));
    }
}
