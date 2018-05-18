import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PodcastsRoutingModule } from './podcasts-routing.module';
import { PodcastsComponent } from './podcasts/podcasts.component';
import { SharedModule } from '../shared/shared.module';
import { InlineEditorModule } from '@qontu/ngx-inline-editor';
import { MomentModule } from 'ngx-moment';
import { ModalModule } from 'ngx-bootstrap/modal';

import { PodcastDetailComponent } from './podcast-detail/podcast-detail.component';
import { PodcastService } from './podcast.service';
import { EntryListItemComponent } from './entry-list-item/entry-list-item.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        PodcastsRoutingModule,
        InlineEditorModule,
        MomentModule,
        ModalModule.forRoot()
    ],
    exports: [PodcastsComponent],
    declarations: [
        PodcastsComponent,
        PodcastDetailComponent,
        EntryListItemComponent
    ],
    providers: [PodcastService]
})
export class PodcastsModule {}
