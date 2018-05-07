import { Observable } from 'rxjs/Observable';
import { SignalRService } from 'app/services/signalr.service';
import { Component, OnInit } from '@angular/core';
import { DebugService } from 'app/services/debug.service';
import { environment } from 'environments/environment';
import { JobsService } from 'app/services/jobs.service';
import { ChatterService } from 'app/services/chatter.service';
import { MessagingService } from 'app/services/messaging.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
    selector: 'app-debug',
    templateUrl: './debug.component.html',
    styleUrls: ['./debug.component.css']
})
export class DebugComponent implements OnInit {
    message$: BehaviorSubject<any>;

    debugInfo$: Observable<string>;
    apiHost = environment.API_HOST;
    signalrHost = environment.SIGNALR_HOST;
    pingPong = '';

    constructor(
        private _debugService: DebugService,
        private _chatterService: ChatterService,
        private _jobsService: JobsService,
        private _pushNotifications: MessagingService,
        private _signalrService: SignalRService
    ) {}
    ngOnInit() {
        this._debugService.ping().subscribe((r) => (this.pingPong = r));
        this.debugInfo$ = this._debugService.getDebugInfo();
    }

    requestPushCallback() {
        this._debugService
            .sendPush()
            .subscribe((r) =>
                console.log('debug.component', 'sendServerPush', r)
            );
    }
    processOrphans() {
        this._jobsService
            .processOrphans()
            .subscribe((e) =>
                console.log('debug.component.ts', 'processOrphans', e)
            );
    }
    processPlaylists() {
        this._jobsService
            .processPlaylists()
            .subscribe((e) =>
                console.log('debug.component.ts', 'processPlaylists', e)
            );
    }
    updateYouTubeDl() {
        this._jobsService
            .updateYouTubeDl()
            .subscribe((e) =>
                console.log('debug.component.ts', 'updateYouTubeDl', e)
            );
    }
}
