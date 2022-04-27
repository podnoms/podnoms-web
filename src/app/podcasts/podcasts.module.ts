import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PodcastsRoutingModule } from './podcasts-routing.module';
import { PodcastComponent } from './podcast/podcast.component';
import { SharedModule } from '../shared/shared.module';
import { MomentModule } from 'ngx-moment';
import {
    NgbModalRef,
    NgbProgressbarModule,
    NgbModule,
} from '@ng-bootstrap/ng-bootstrap';
import { QuillModule } from 'ngx-quill';

import { PodcastDetailComponent } from './podcast-detail/podcast-detail.component';
import { PodcastStoreService } from './podcast-store.service';
import { EntryListItemComponent } from './entry-list-item/entry-list-item.component';
import { EntryUploadComponent } from './entry-upload/entry-upload.component';
import { UploadUrlComponent } from './entry-upload/upload-url/upload-url.component';
import { UploadFileComponent } from './entry-upload/upload-file/upload-file.component';
import { PodcastEditFormComponent } from './podcast-edit-form/podcast-edit-form.component';
import { PodcastAddWizardComponent } from './podcast-add-wizard/podcast-add-wizard.component';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { NotificationsComponent } from './notifications/notifications-component/notifications.component';
import { NotificationItemComponent } from './notifications/notification-item/notification-item.component';
import { NotificationControlService } from './notifications/services/notification-control.service';
import { NotificationModalComponent } from './notifications/notification-modal/notification-modal.component';
import { NotificationStoreService } from './notifications/services/notification-store.service';
import { UtilsModule } from '../utils/utils.module';
import { NotificationLogsComponent } from './notifications/notification-logs/notification-logs.component';
import { EntryEditFormComponent } from './entry-edit-form/entry-edit-form.component';
import { UploadDropboxComponent } from './entry-upload/upload-dropbox/upload-dropbox.component';
import { UploadGdriveComponent } from './entry-upload/upload-gdrive/upload-gdrive.component';
import { BaseJsUploadComponent } from './base-js-upload.component';
import { RemotePageParserComponent } from './entry-upload/remote-page-parser/remote-page-parser.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ComponentsModule } from '../components/components.module';
import { EntryDeleteItemModalComponent } from './entry-list-item/entry-delete-item-modal.component';
import { NotificationItemDeleteComponent } from './notifications/notification-item/notification-item-delete.component';
import { PodcastDeleteComponent } from './podcast-delete.component';
import { EntryLogsComponent } from './entry-logs/entry-logs.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PodcastEditFormDetailsComponent } from './podcast-edit-form/podcast-edit-form-details/podcast-edit-form-details.component';
import { PodcastEditFormAdvancedComponent } from './podcast-edit-form/podcast-edit-form-advanced/podcast-edit-form-advanced.component';
import { PodcastPublicSettingsComponent } from './podcast-public-settings/podcast-public-settings.component';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { environment } from 'environments/environment';
@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        UtilsModule,
        PodcastsRoutingModule,
        MomentModule,
        QuillModule.forRoot(),
        DropzoneModule,
        NgSelectModule,
        NgbProgressbarModule,
        NgxDatatableModule,
        ComponentsModule,
        NgbModule,
        LoggerModule.forRoot(environment.logConfig),
    ],
    exports: [PodcastComponent],
    declarations: [
        BaseJsUploadComponent,
        PodcastComponent,
        PodcastDetailComponent,
        EntryListItemComponent,
        EntryDeleteItemModalComponent,
        EntryUploadComponent,
        UploadUrlComponent,
        UploadFileComponent,
        PodcastAddWizardComponent,
        PodcastDeleteComponent,
        PodcastEditFormComponent,
        NotificationsComponent,
        NotificationItemComponent,
        NotificationModalComponent,
        NotificationItemDeleteComponent,
        PodcastPublicSettingsComponent,
        NotificationLogsComponent,
        EntryEditFormComponent,
        UploadDropboxComponent,
        UploadGdriveComponent,
        RemotePageParserComponent,
        EntryLogsComponent,
        PodcastEditFormDetailsComponent,
        PodcastEditFormAdvancedComponent,
    ],
    providers: [
        PodcastStoreService,
        NotificationStoreService,
        NotificationControlService,
    ]
})
export class PodcastsModule {
    constructor() {
        //bring in animations to ng-bootstrap modal
        NgbModalRef.prototype['c'] = NgbModalRef.prototype.close;
        NgbModalRef.prototype.close = function (reason: string) {
            document.querySelector('.modal-backdrop').classList.remove('show');
            document.querySelector('.modal').classList.remove('show');
            setTimeout(() => {
                this['c'](reason);
            }, 500);
        };
        NgbModalRef.prototype['d'] = NgbModalRef.prototype.dismiss;
        NgbModalRef.prototype.dismiss = function (reason: string) {
            document.querySelector('.modal-backdrop').classList.remove('show');
            document.querySelector('.modal').classList.remove('show');
            setTimeout(() => {
                this['d'](reason);
            }, 500);
        };
    }
}
