import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HubConnection } from '@aspnet/signalr';
import { environment } from 'environments/environment';

@Injectable()
export class SignalRService {
    public connection: HubConnection;

    constructor(private _auth: AuthService) {}
    public init(hub: string): Promise<void> {
        const url = `${environment.SIGNALR_HOST}hubs/${hub}`;

        const token = this._auth.getToken();
        const options: any = {
            transport: 0
        };
        this.connection = new HubConnection(url + '?token=' + token, options);
        return this.connection.start();
    }
}
