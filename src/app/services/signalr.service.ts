import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import {HubConnection} from '@aspnet/signalr';


@Injectable()
export class SignalRService {
    public connection: HubConnection;

    constructor(private _auth: AuthService) {

    }
    public init(url: string): Promise<void> {
        const token = this._auth.getToken();
        const options: any = {
            transport: 0
        };
        this.connection = new HubConnection(url + '?token=' + token, options);
        return this.connection.start();
    }
}
