import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EasyPieChartModule } from 'ng2modules-easypiechart';
import { AuthService } from '../auth/auth.service';
import { SharedModule } from '../shared/shared.module';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
    imports: [CommonModule, SharedModule, ProfileRoutingModule, EasyPieChartModule],
    exports: [],
    declarations: [ProfileComponent],
    providers: [AuthService]
})
export class ProfileModule {}
