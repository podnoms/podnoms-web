import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderByPipe } from './pipes/order-by.pipe';
import { OrderByDatePipe } from './pipes/order-by-date.pipe';
import { HumaniseTimePipe } from './pipes/humanise-time.pipe';
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
import { AudioDownloadService } from './services/audio-download.service';
import { LoaderComponent } from './components/loader/loader.component';
import { ToastComponent } from './components/toast/toast.component';
import { ToastItemComponent } from './components/toast/toast-item.component';
import { FileSizeComponent } from './components/file-size/file-size.component';
import { SpinnerButtonComponent } from './components/spinner-button/spinner-button.component';
import { ModalUpdatesComponent } from './components/modal-updates/modal-updates.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserSlugModalComponent } from './components/modal-updates/user-slug-modal.component';
import { AutofocusDirective } from './directives/auto-focus.directive';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './auth/token.interceptor';
import { SimpleAudioPlayerComponent } from './components/simple-audio-player/simple-audio-player.component';
import { BaseComponent } from './components/base/base.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { LoggerModule } from 'ngx-logger';
import { environment } from 'environments/environment';
import { SecretHiderComponent } from './components/secret-hider/secret-hider.component';
import { ServerShowcaseModalComponent } from './components/modal-updates/server-showcase-modal/server-showcase-modal.component';
import { UniqueIdPipe } from './pipes/unique-id.pipe';
import { SortByPipe } from './pipes/sort-by.pipe';
import { FilterIfPipe } from './pipes/filter-if.pipe';
import { AngularResizedEventModule } from 'angular-resize-event';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        NgbModule,
        NgSelectModule,
        AngularResizedEventModule,
        LoggerModule.forRoot(environment.logConfig),
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        OrderByPipe,
        AutofocusDirective,
        OrderByDatePipe,
        HumaniseTimePipe,
        BytesToHumanPipe,
        SafeHtmlPipe,
        UniqueIdPipe,
        BasePageComponent,
        ImageUploadComponent,
        LoaderComponent,
        SpinnerButtonComponent,
        SecretHiderComponent,
        ToastComponent,
        FileSizeComponent,
        ModalUpdatesComponent,
        CategorySelectorComponent,
        SimpleAudioPlayerComponent,
        FilterIfPipe,
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
        SpinnerButtonComponent,
        SecretHiderComponent,
        ToastItemComponent,
        FileSizeComponent,
        ModalUpdatesComponent,
        UserSlugModalComponent,
        SimpleAudioPlayerComponent,
        BaseComponent,
        SafeHtmlPipe,
        ServerShowcaseModalComponent,
        UniqueIdPipe,
        SortByPipe,
        FilterIfPipe,
    ],
    entryComponents: [UserSlugModalComponent],
    providers: [
        UtilityService,
        SignalRService,
        ImageService,
        AudioDownloadService,
        PushRegistrationService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true,
        },
    ],
})
export class SharedModule {}
