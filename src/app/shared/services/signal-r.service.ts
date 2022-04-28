import { Injectable } from '@angular/core';
import {
  HttpTransportType,
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from '@microsoft/signalr';
import { Observable, Subscriber } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../auth/auth.service';

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

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  private connectionPool: HubCollection = {};

  constructor(private authService: AuthService) {}
  public init(hubName: string): Promise<SignalRService> {
    return new Promise((resolve) => {
      const url = `${environment.signalRHost}/hubs/${hubName}`;
      const token = this.authService.getAuthToken();
      const hub = this.connectionPool[hubName];
      if (!hub) {
        const connection = new HubConnectionBuilder()
          .withUrl(url, {
            skipNegotiation: true,
            transport: HttpTransportType.WebSockets,
            accessTokenFactory: () => token,
          })
          .configureLogging(
            environment.production ? LogLevel.Error : LogLevel.Error
          )
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
