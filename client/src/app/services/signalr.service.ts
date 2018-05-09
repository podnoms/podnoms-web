import { PodnomsAuthService } from './podnoms-auth.service';
import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@aspnet/signalr';
import { environment } from 'environments/environment';
import { Observable, Subscriber } from 'rxjs';

@Injectable()
export class SignalRService {
    private _connected: boolean = false;
    private _connection: HubConnection;

    constructor(private _auth: PodnomsAuthService) {}
    public init(hub: string): Promise<SignalRService> {
        return new Promise((resolve) => {
            const url = `${environment.SIGNALR_HOST}/hubs/${hub}`;
            const token = this._auth.getToken();
            this._connection = new HubConnectionBuilder()
                .configureLogging(LogLevel.Debug)
                .withUrl(url + '?token=' + token)
                .build();
            resolve(this);
        });
    }

    public on<T>(channel: string): Observable<T> {
        const listener = new Observable<T>((subscriber: Subscriber<T>) => {
            this._connection.on(channel, (message) => {
                const result: T = message as T;
                subscriber.next(result);
            });
        });
        if (!this._connected) {
            this._connection.start().then(() => (this._connected = true));
        }
        return listener;
    }
}
