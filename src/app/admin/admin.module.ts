import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityComponent } from './activity/activity.component';
import { AdminRoutingModule } from './admin-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { LoggerModule } from 'ngx-logger';
import { environment } from 'environments/environment';
import { RolesComponent } from './roles/roles.component';
import { FormsModule } from '@angular/forms';
import { MomentModule } from 'ngx-moment';

@NgModule({
  declarations: [ActivityComponent, RolesComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgxDatatableModule,
    FormsModule,
    MomentModule,
    LoggerModule.forRoot(environment.logConfig),
  ],
})
export class AdminModule {}
