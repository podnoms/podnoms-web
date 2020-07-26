import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { Profile } from './core';
import { UiStateService } from './core/ui-state.service';
import { SignalRService } from './shared/services/signal-r.service';
import { UtilityService } from './shared/services/utility.service';
import { Router } from '@angular/router';
import { UpdateService } from './shared/services/update.service';
import { ProfileStoreService } from './profile/profile-store.service';
import { environment } from '../environments/environment';
import { SwPush } from '@angular/service-worker';
import { PushRegistrationService } from './shared/services/push-registration.service';
import { skip, take, tap, map } from 'rxjs/operators';
import { SiteUpdateMessage } from './core/model/site-update-message';
import { AlertService } from './core/alerts/alert.service';
import { BaseComponent } from './shared/components/base/base.component';
import { NGXLogger } from 'ngx-logger';
import { LoggingService } from './services/logging.service';
import { SiteMessagesService } from './shared/services/site-messages.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent extends BaseComponent {
    constructor() {
        super();
    }
}
