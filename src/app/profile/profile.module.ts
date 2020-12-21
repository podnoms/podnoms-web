import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth.service';
import { SharedModule } from '../shared/shared.module';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { ComponentsModule } from '../components/components.module';
import { ChartsModule } from 'ng2-charts';
import { PaymentsModule } from '../payments/payments.module';
import { UserNotificationsSettingsComponent } from './notifications/user-notifications-settings/user-notifications-settings.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ApiKeysComponent } from './api-keys/api-keys.component';
import { OpmlPageComponent } from './opml-page/opml-page.component';
import { YoutubeApiKeyComponent } from './api-keys/youtube-api-key/youtube-api-key.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        ComponentsModule,
        ProfileRoutingModule,
        ChartsModule,
        PaymentsModule,
        NgbModule,
    ],
    exports: [],
    declarations: [
        ProfileComponent,
        UserNotificationsSettingsComponent,
        ApiKeysComponent,
        OpmlPageComponent,
        YoutubeApiKeyComponent,
    ],
    providers: [AuthService],
})
export class ProfileModule {}
