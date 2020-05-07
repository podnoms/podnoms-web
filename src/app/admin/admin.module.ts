import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityComponent } from './activity/activity.component';
import { AdminRoutingModule } from './admin-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MomentModule } from 'ngx-moment';
import { LoggerModule } from 'ngx-logger';
import { environment } from 'environments/environment';

@NgModule({
    declarations: [ActivityComponent],
    imports: [
        CommonModule,
        AdminRoutingModule,
        MomentModule,
        NgxDatatableModule,
        LoggerModule.forRoot(environment.logConfig)
    ]
})
export class AdminModule {}
