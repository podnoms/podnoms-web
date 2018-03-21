import { GlobalsService } from './services/globals.service';
import { Component, HostBinding, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from 'app/services/auth.service';
import { AppInsightsService } from 'app/services/app-insights.service';
import { SignalRService } from 'app/services/signalr.service';
import { ProfileService } from './services/profile.service';
import { PushNotificationsService } from 'app/services/push-notifications.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    constructor(
        private _authService: AuthService,
        private _signalrService: SignalRService,
        private _profileService: ProfileService,
        private _pushNotifications: PushNotificationsService,
        _appInsights: AppInsightsService
    ) {
        _authService.handleAuthentication();
        _authService.scheduleRenewal();
    }
    loggedIn() {
        return this._authService.isAuthenticated();
    }

    ngOnInit() {
        // this._pushNotifications.requestPermissions();

        if (this.loggedIn()) {
            const user = this._profileService.getProfile().subscribe(u => {
                if (u) {
                    const chatterChannel = `${u.uid}_chatter`;
                    this._signalrService
                        .init('chatter')
                        .then(r => {
                            console.log(
                                'app.component',
                                'Chatter Service ready to rock',
                                r
                            );
                            this._signalrService.connection.on(
                                chatterChannel,
                                result => {
                                    this._pushNotifications.createNotification(
                                        'PodNoms',
                                        result
                                    );
                                }
                            );
                        })
                        .catch(err => {
                            console.error(
                                'app.component',
                                'Unable to initialise chatter hub',
                                err
                            );
                        });
                }
            });
        }
    }
}
