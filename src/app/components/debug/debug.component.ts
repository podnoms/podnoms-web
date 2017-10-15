import { SignalRService } from './../../services/signalr.service';
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
    constructor(private _service: DebugService, private _signalRService: SignalRService) { }

    ngOnInit() {

        this._signalRService.init('http://localhost:5000/hubs/debug');

        this._signalRService.connection.on('Send', data => {
            console.log('DebugService', 'signalr', data);
            this.messagesReceived.push(data);
            this.realtimeMessage = '';
        });
    }

    sendMessage() {
        this._service.sendRealtime(this.realtimeMessage)
            .subscribe(r => console.log(r));
    }
    doSomething() {
        alert('doSomething was did');
    }
}
