import { Observable } from 'rxjs/Observable';
import { SignalRService } from 'app/services/signalr.service';
import { Component, OnInit } from '@angular/core';
import { DebugService } from 'app/services/debug.service';
import { environment } from 'environments/environment';
import { JobsService } from 'app/services/jobs.service';
import { PushNotificationsService } from 'ng-push';
import { ChatterService } from 'app/services/chatter.service';

@Component({
    selector: 'app-debug',
    templateUrl: './debug.component.html',
    styleUrls: ['./debug.component.css']
})
export class DebugComponent implements OnInit {
    realtimeMessage: string;
    notificationMessage: string;

    messagesReceived: string[] = [];

    debugInfo$: Observable<string>;
    apiHost = environment.API_HOST;
    signalrHost = environment.SIGNALR_HOST;
    pingPong = '';

    constructor(
        private _debugService: DebugService,
        private _chatterService: ChatterService,
        private _jobsService: JobsService,
        private _pushNotifications: PushNotificationsService,
        private _signalrService: SignalRService
    ) {}
    ngOnInit() {
        // this._signalrService
        //     .init(`${environment.SIGNALR_HOST}hubs/debug`)
        //     .then(() => {
        //         this._signalrService.connection.on('Send', data => {
        //             console.log('DebugService', 'signalr', data);
        //             this.messagesReceived.push(data);
        //             this.realtimeMessage = '';
        //         });
        //         this.debugInfo$ = this._debugService.getDebugInfo();
        //     })
        //     .catch(err =>
        //         console.error('debug.component.ts', '_signalrService.init', err)
        //     );
        this._debugService.ping().subscribe(r => (this.pingPong = r));
    }

    sendMessage() {
        this._debugService
            .sendRealtime(this.realtimeMessage)
            .subscribe(r => console.log(r));
    }
    doSomething() {
        alert('doSomething was did');
    }
    sendChatter() {
        this._chatterService.ping('Pong').subscribe(r => {
            this._pushNotifications.create('PodNoms', { body: r });
        });
    }
    sendDesktopNotification() {
        console.log(
            'debug.component',
            'sendDesktopFunction',
            this.notificationMessage
        );
        this._pushNotifications
            .create('PodNoms', { body: this.notificationMessage })
            .subscribe(
                res =>
                    console.log(
                        'debug.component',
                        'sendDesktopNotification',
                        res
                    ),
                err =>
                    console.log(
                        'debug.component',
                        'sendDesktopNotification',
                        err
                    )
            );
    }
    processOrphans() {
        this._jobsService
            .processOrphans()
            .subscribe(e =>
                console.log('debug.component.ts', 'processOrphans', e)
            );
    }
    processPlaylists() {
        this._jobsService
            .processPlaylists()
            .subscribe(e =>
                console.log('debug.component.ts', 'processPlaylists', e)
            );
    }
    updateYouTubeDl() {
        this._jobsService
            .updateYouTubeDl()
            .subscribe(e =>
                console.log('debug.component.ts', 'updateYouTubeDl', e)
            );
    }
}
