import { Observable } from 'rxjs/Observable';
import { environment } from 'environments/environment';
import { SignalRService } from 'app/services/signalr.service';
import { HubConnection } from '@aspnet/signalr-client';
import { Component, OnInit } from '@angular/core';
import { DebugService } from 'app/services/debug.service';

@Component({
    selector: 'app-debug',
    templateUrl: './debug.component.html',
    styleUrls: ['./debug.component.css']
})
export class DebugComponent implements OnInit {
    realtimeMessage: string;
    messagesReceived: string[] = [];

    debugInfo$: Observable<string>;

    constructor(private _debugService: DebugService, private _signalrService: SignalRService) {}
    ngOnInit() {
        this._signalrService.init(`${environment.SIGNALR_HOST}hubs/debug`).then(() => {
            this._signalrService.connection.on('Send', data => {
                console.log('DebugService', 'signalr', data);
                this.messagesReceived.push(data);
                this.realtimeMessage = '';
            });
            this.debugInfo$ = this._debugService.getDebugInfo();
        }).catch((err) => console.error('debug.component.ts', '_signalrService.init', err));
    }

    sendMessage() {
        this._debugService.sendRealtime(this.realtimeMessage).subscribe(r => console.log(r));
    }
    doSomething() {
        alert('doSomething was did');
    }
}
