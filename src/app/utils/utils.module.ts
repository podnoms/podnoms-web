import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoggerModule } from 'ngx-logger';
import { environment } from 'environments/environment';

@NgModule({
    imports: [CommonModule, LoggerModule.forRoot(environment.logConfig)],
    declarations: []
})
export class UtilsModule {}
