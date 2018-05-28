import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PodcastsRoutingModule } from './podcasts-routing.module';
import { PodcastComponent } from './podcast/podcast.component';
import { SharedModule } from '../shared/shared.module';
import { InlineEditorModule } from '@qontu/ngx-inline-editor';
import { MomentModule } from 'ngx-moment';
import { QuillModule } from 'ngx-quill';

import { PodcastDetailComponent } from './podcast-detail/podcast-detail.component';
import { PodcastStoreService } from './podcast-store.service';
import { EntryListItemComponent } from './entry-list-item/entry-list-item.component';
import { EntryUploadComponent } from './entry-upload/entry-upload.component';
import { UploadUrlComponent } from './entry-upload/upload-url/upload-url.component';
import { UploadFileComponent } from './entry-upload/upload-file/upload-file.component';
import { PodcastEditFormComponent } from './podcast-edit-form/podcast-edit-form.component';
import { ModalModule } from 'ngx-bootstrap';
import { PodcastAddWizardComponent } from './podcast-add-wizard/podcast-add-wizard.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        PodcastsRoutingModule,
        InlineEditorModule,
        MomentModule,
        ModalModule.forRoot(),
        QuillModule
    ],
    exports: [PodcastComponent],
    declarations: [
        PodcastComponent,
        PodcastDetailComponent,
        EntryListItemComponent,
        EntryUploadComponent,
        UploadUrlComponent,
        UploadFileComponent,
        PodcastEditFormComponent,
        PodcastAddWizardComponent
    ],
    providers: [PodcastStoreService]
})
export class PodcastsModule {}
