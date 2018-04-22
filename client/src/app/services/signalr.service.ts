import { PodnomsAuthService } from './podnoms-auth.service';
import { Injectable } from '@angular/core';
import {
    HubConnection,
    HubConnectionBuilder,
    JsonHubProtocol,
    LogLevel
} from '@aspnet/signalr';
import { environment } from 'environments/environment';

@Injectable()
export class SignalRService {
    public connection: HubConnection;

    constructor(private _auth: PodnomsAuthService) {}
    public init(hub: string): Promise<void> {
        const url = `${environment.SIGNALR_HOST}/hubs/${hub}`;

        const token = this._auth.getToken();
        const options: any = {
            transport: 0
        };

        this.connection = new HubConnectionBuilder()
            .configureLogging(LogLevel.Error)
            .withUrl(url + '?token=' + token, options)
            .withHubProtocol(new JsonHubProtocol())
            .build();
        return this.connection.start();
    }
}
