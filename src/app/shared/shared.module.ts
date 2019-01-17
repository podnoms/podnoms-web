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
import { NgSelectModule } from '@ng-select/ng-select';
import { SignalRService } from './services/signal-r.service';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { PushRegistrationService } from './services/push-registration.service';
import { CategorySelectorComponent } from './components/category-selector/category-selector.component';
import { CamelCaseToSentencePipe } from './pipes/camel-case-to-sentence.pipe';
import { ErrorComponent } from './components/error/error.component';
import { AudioDownloadService } from './services/audio-download.service';
import { ToastComponent } from './components/toast/toast.component';
import { ToastItemComponent } from './components/toast/toast-item.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        SocialLoginModule,
        NgSelectModule
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        OrderByPipe,
        OrderByDatePipe,
        HumaniseTimePipe,
        BytesToHumanPipe,
        BasePageComponent,
        ImageUploadComponent,
        ToastComponent,
        CategorySelectorComponent
    ],
    declarations: [
        OrderByPipe,
        HumaniseTimePipe,
        OrderByDatePipe,
        BasePageComponent,
        BytesToHumanPipe,
        ToastComponent,
        ImageUploadComponent,
        CategorySelectorComponent,
        CamelCaseToSentencePipe,
        ErrorComponent,
        ToastItemComponent
    ],
    providers: [
        UtilityService,
        SignalRService,
        ImageService,
        AudioDownloadService,
        PushRegistrationService,
        {
            provide: AuthServiceConfig,
            useFactory: authServiceConfig
        }
    ]
})
export class SharedModule {}
