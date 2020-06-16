import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicRoutingModule } from './public-routing.module';
import { LoggerModule } from 'ngx-logger';
import { environment } from 'environments/environment';
import { ProcessUrlComponent } from './components/process-url/process-url.component';
import { UrlProcessorService } from './services/url-processor.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
    declarations: [ProcessUrlComponent],
    imports: [
        CommonModule,
        PublicRoutingModule,
        LoggerModule.forRoot(environment.logConfig),
        FormsModule,
        ReactiveFormsModule,
    ],
    providers: [UrlProcessorService],
})
export class PublicModule {}
