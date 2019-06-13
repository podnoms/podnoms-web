import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityComponent } from './activity/activity.component';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
    declarations: [ActivityComponent],
    imports: [CommonModule, AdminRoutingModule]
})
export class AdminModule {}
