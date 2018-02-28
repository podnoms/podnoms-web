import { Observable } from 'rxjs/Observable';
import { SignalRService } from 'app/services/signalr.service';
import { Component, OnInit } from '@angular/core';
import { DebugService } from 'app/services/debug.service';
import { environment } from 'environments/environment';

@Component({
    selector: 'app-debug',
    templateUrl: './debug.component.html',
    styleUrls: ['./debug.component.css']
})
export class DebugComponent implements OnInit {
    realtimeMessage: string;
    messagesReceived: string[] = [];

    debugInfo$: Observable<string>;
    apiHost = environment.API_HOST;
    signalrHost = environment.SIGNALR_HOST;
    pingPong = '';

    constructor(private _debugService: DebugService, private _signalrService: SignalRService) {}
    ngOnInit() {
        this._signalrService
            .init(`${environment.SIGNALR_HOST}hubs/debug`)
            .then(() => {
                this._signalrService.connection.on('Send', data => {
                    console.log('DebugService', 'signalr', data);
                    this.messagesReceived.push(data);
                    this.realtimeMessage = '';
                });
                this.debugInfo$ = this._debugService.getDebugInfo();
            })
            .catch(err => console.error('debug.component.ts', '_signalrService.init', err));

        this._debugService.ping().subscribe(r => (this.pingPong = r));
    }

    sendMessage() {
        this._debugService.sendRealtime(this.realtimeMessage).subscribe(r => console.log(r));
    }
    doSomething() {
        alert('doSomething was did');
    }
}
