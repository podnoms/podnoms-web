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
import { LoaderComponent } from './components/loader/loader.component';
import { ToastComponent } from './components/toast/toast.component';
import { ToastItemComponent } from './components/toast/toast-item.component';
import { FileSizeComponent } from './components/file-size/file-size.component';
import { SpinnerButtonComponent } from './components/spinner-button/spinner-button.component';
import { ModalUpdatesComponent } from './components/modal-updates/modal-updates.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserSlugModalComponent } from './components/modal-updates/user-slug-modal.component';
import { UserSlugChangeComponent } from './components/modal-updates/user-slug-change.component';
import { AutofocusDirective } from './directives/auto-focus.directive';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        SocialLoginModule,
        NgbModule,
        NgSelectModule
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        OrderByPipe,
        AutofocusDirective,
        OrderByDatePipe,
        HumaniseTimePipe,
        BytesToHumanPipe,
        BasePageComponent,
        ImageUploadComponent,
        LoaderComponent,
        SpinnerButtonComponent,
        ToastComponent,
        FileSizeComponent,
        ModalUpdatesComponent,
        CategorySelectorComponent
    ],
    declarations: [
        OrderByPipe,
        AutofocusDirective,
        HumaniseTimePipe,
        OrderByDatePipe,
        BasePageComponent,
        BytesToHumanPipe,
        ToastComponent,
        ImageUploadComponent,
        LoaderComponent,
        CategorySelectorComponent,
        CamelCaseToSentencePipe,
        ErrorComponent,
        SpinnerButtonComponent,
        ToastItemComponent,
        FileSizeComponent,
        ModalUpdatesComponent,
        UserSlugModalComponent,
        UserSlugChangeComponent
    ],
    entryComponents: [UserSlugModalComponent],
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
