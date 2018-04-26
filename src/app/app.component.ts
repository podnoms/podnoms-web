import { GlobalsService } from './services/globals.service';
import { Component, HostBinding, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToastyService } from 'ng2-toasty';
import { PodnomsAuthService } from 'app/services/podnoms-auth.service';
import { AppInsightsService } from 'app/services/app-insights.service';
import { SignalRService } from 'app/services/signalr.service';
import { ProfileService } from './services/profile.service';
import { MessagingService } from 'app/services/messaging.service';
import { UiStateService } from 'app/services/ui-state.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    overlayOpen: boolean = false;
    constructor(
        private _authService: PodnomsAuthService,
        private _toastyService: ToastyService,
        private _signalrService: SignalRService,
        private _profileService: ProfileService,
        private _messagingService: MessagingService,
        private _uiStateService: UiStateService,
        _appInsights: AppInsightsService
    ) {}
    loggedIn() {
        return this._authService.isAuthenticated();
    }

    ngOnInit() {
        // this._pushNotifications.requestPermissions();
        this._uiStateService.change.subscribe((r) => (this.overlayOpen = r));
        if (this.loggedIn()) {
            const user = this._profileService.getProfile().subscribe((u) => {
                if (u) {
                    this._messagingService.getPermission();
                    this._messagingService.receiveMessage();
                    const chatterChannel = `${u.uid}_chatter`;
                    this._signalrService
                        .init('chatter')
                        .then((r) => {
                            this._signalrService.connection.on(
                                chatterChannel,
                                (result) => {
                                    this._toastyService.info(result);
                                }
                            );
                        })
                        .catch((err) => {
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
