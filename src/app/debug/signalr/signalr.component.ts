import { Component, OnInit } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { environment } from 'environments/environment';
import { AuthService } from 'app/auth/auth.service';
import { ProfileDataService } from 'app/profile/profile-data.service';
import { Profile } from 'app/core/model';
import { NgxFancyLoggerService } from 'ngx-fancy-logger';

@Component({
    selector: 'app-signalr',
    templateUrl: './signalr.component.html',
    styleUrls: ['./signalr.component.scss']
})
export class SignalRComponent implements OnInit {
    private _hubConnection: HubConnection;

    hubAvailable: boolean = false;
    nick = 'Unknown User';
    message = '';
    messages: string[] = [];
    chatMessage: string = '';
    profile: Profile;

    constructor(
        private _authService: AuthService,
        private _profileService: ProfileDataService,
        private logger: NgxFancyLoggerService
    ) {}

    ngOnInit() {
        this._profileService.getProfile().subscribe(p => {
            this.logger.debug('signalr.component', 'getProfile', p[0]);
            this.nick = p[0].name || `${p[0].firstName} ${p[0].lastName}`;
        });
    }
    connectSignalR() {
        this._hubConnection = new HubConnectionBuilder()
            .withUrl(
                `${
                    environment.signalRHost
                }/hubs/debug?token=${this._authService.getAuthToken()}`,
                {
                    accessTokenFactory: () => this._authService.getAuthToken()
                }
            )
            .build();

        this._hubConnection
            .start()
            .then(() => {
                this.logger.debug(
                    'signalr.component',
                    'hubConnection',
                    'Connection started'
                );
                this.hubAvailable = true;
            })
            .catch(err =>
                this.logger.debug('Error while starting connection: ' + err)
            );
        this._hubConnection.on(
            'send',
            (nick: string, receivedMessage: string) => {
                const text = `${nick}: ${receivedMessage}`;
                this.logger.debug('signalr.component', 'send_received', text);
                this.messages.push(text);
            }
        );
    }
    public sendMessage(): void {
        this._hubConnection
            .invoke('send', this.nick, this.message)
            .then(() => (this.message = ''))
            .catch(err => console.error(err));
    }
    disconnectSignalR() {}
}
