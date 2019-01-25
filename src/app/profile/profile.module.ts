import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth.service';
import { SharedModule } from '../shared/shared.module';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { ComponentsModule } from '../components/components.module';
import { ChartsModule } from 'ng2-charts';
import { PaymentListComponent } from '../payments/components/payment-list/payment-list.component';

@NgModule({
    imports: [CommonModule, SharedModule, ComponentsModule, ProfileRoutingModule, ChartsModule],
    exports: [],
    declarations: [ProfileComponent, PaymentListComponent],
    providers: [AuthService]
})
export class ProfileModule {}
