import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

// these will be added once ng cli will release 1.5
import { HubConnection, TransportType } from '@aspnet/signalr-client';
// import { IHubConnectionOptions } from '@aspnet/signalr-client/dist/src/IHubConnectionOptions';

declare var signalR: any;

@Injectable()
export class SignalRService {
    public connection: HubConnection;

    constructor(private _auth: AuthService) {

    }
    public init(url: string) {
        const token = this._auth.getToken();
        const options: any = {
            transport: 0
        };
        this.connection = new HubConnection(url + '?token=' + token, options);
        this.connection.start();
    }
}
