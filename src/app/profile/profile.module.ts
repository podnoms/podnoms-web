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
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        ComponentsModule,
        ProfileRoutingModule,
        ChartsModule,
        PaymentsModule,
        NgbTabsetModule
    ],
    exports: [],
    declarations: [ProfileComponent, UserNotificationsSettingsComponent],
    providers: [AuthService]
})
export class ProfileModule {}
