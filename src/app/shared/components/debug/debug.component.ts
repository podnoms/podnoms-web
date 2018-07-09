import { Component, OnInit } from '@angular/core';
import { DebugService } from '../../services/debug.service';

@Component({
    selector: 'app-debug',
    templateUrl: './debug.component.html',
    styleUrls: ['./debug.component.scss']
})
export class DebugComponent implements OnInit {
    constructor(private debugService: DebugService) {}

    ngOnInit() {}
    sendPush() {
        this.debugService.sendPushPessage('Hello Sailor').subscribe(r => alert(r));
    }
}
