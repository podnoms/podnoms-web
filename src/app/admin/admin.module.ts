import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityComponent } from './activity/activity.component';
import { AdminRoutingModule } from './admin-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MomentModule } from 'ngx-moment';

@NgModule({
    declarations: [ActivityComponent],
    imports: [
        CommonModule,
        AdminRoutingModule,
        MomentModule,
        NgxDatatableModule
    ]
})
export class AdminModule {}
