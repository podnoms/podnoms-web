import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicRoutingModule } from './public-routing.module';
import { LoggerModule } from 'ngx-logger';
import { environment } from 'environments/environment';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        PublicRoutingModule,
        LoggerModule.forRoot(environment.logConfig)
    ]
})
export class PublicModule {}
