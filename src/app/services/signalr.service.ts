import { PodnomsAuthService } from './podnoms-auth.service';
import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@aspnet/signalr';
import { environment } from 'environments/environment';
import { Observable, Subscriber } from 'rxjs';

class HubListener {
    constructor(connection: HubConnection) {
        this.connection = connection;
        this.isConnecting = false;
        this.isConnected = false;
    }
    connection: HubConnection;
    isConnected: boolean;
    isConnecting: boolean;
}
interface HubCollection {
    [hubName: string]: HubListener;
}

@Injectable()
export class SignalRService {
    private connectionPool: HubCollection = {};

    constructor(private _auth: PodnomsAuthService) {}
    public init(hubName: string): Promise<SignalRService> {
        return new Promise((resolve) => {
            const url = `${environment.SIGNALR_HOST}/hubs/${hubName}`;
            const token = this._auth.getToken();
            let hub = this.connectionPool[hubName];
            if (!hub) {
                const connection = new HubConnectionBuilder()
                    .configureLogging(LogLevel.Debug)
                    .withUrl(url + '?token=' + token)
                    .build();
                this.connectionPool[hubName] = new HubListener(connection);
            }
            resolve(this);
        });
    }

    public on<T>(hub: string, channel: string): Observable<T> {
        const listener = new Observable<T>((subscriber: Subscriber<T>) => {
            const h = this.connectionPool[hub];
            h.connection.on(channel, (message) => {
                const result: T = message as T;
                subscriber.next(result);
            });
            h.connection.onclose(() => {
                h.isConnected = false;
            });
            if (!h.isConnected && !h.isConnecting) {
                h.isConnecting = true;
                h.connection.start().then(() => {
                    h.isConnected = true;
                    h.isConnecting = false;
                    this.connectionPool[hub] = h;
                });
            }
            this.connectionPool[hub] = h;
        });

        return listener;
    }
}
