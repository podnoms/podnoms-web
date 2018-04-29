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
import { ApplicationState } from 'app/store';
import * as fromProfile from 'app/reducers';
import * as fromProfileActions from 'app/actions/profile.actions';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    sidebarOpen: boolean = true;
    overlayOpen: boolean = false;
    constructor(
        private _authService: PodnomsAuthService,
        private _store: Store<ApplicationState>,
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
        this._uiStateService.sidebarChanged.subscribe(
            (r) => (this.sidebarOpen = r)
        );
        this._uiStateService.overlayChanged.subscribe(
            (r) => (this.overlayOpen = r)
        );
        this._authService.authNavStatus$.subscribe(r => r && this._bootstrapAuthorisedServices());
    }
    _bootstrapAuthorisedServices(){
        if (this.loggedIn()) {
            this._store.dispatch(new fromProfileActions.LoadAction());
            const profile$ = this._store.select(fromProfile.getProfile);
            profile$.subscribe((p) => {
                if (p) {
                    this._messagingService.getPermission();
                    this._messagingService.receiveMessage();
                    const chatterChannel = `${p.uid}_chatter`;
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
