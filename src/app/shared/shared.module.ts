import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderByPipe } from './pipes/order-by.pipe';
import { OrderByDatePipe } from './pipes/order-by-date.pipe';
import { HumaniseTimePipe } from './pipes/humanise-time.pipe';
import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { authServiceConfig } from '../auth/auth-config';
import { BasePageComponent } from './components/base-page/base-page.component';
import { BytesToHumanPipe } from './pipes/bytes-to-human.pipe';
import { UtilityService } from './services/utility.service';
import { ImageService } from './services/image.service';
import { RouterModule } from '@angular/router';
import { SignalRService } from './services/signal-r.service';
import { NgxSmartModalModule } from 'ngx-smart-modal';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        SocialLoginModule,
        NgxSmartModalModule.forRoot()
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        OrderByPipe,
        OrderByDatePipe,
        HumaniseTimePipe,
        BytesToHumanPipe,
        BasePageComponent
    ],
    declarations: [
        OrderByPipe,
        HumaniseTimePipe,
        OrderByDatePipe,
        BasePageComponent,
        BytesToHumanPipe
    ],
    providers: [
        UtilityService,
        SignalRService,
        ImageService,
        {
            provide: AuthServiceConfig,
            useFactory: authServiceConfig
        }
    ]
})
export class SharedModule {}
