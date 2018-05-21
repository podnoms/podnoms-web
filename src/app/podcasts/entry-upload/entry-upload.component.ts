import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Podcast, PodcastEntry } from '../../core';
import { UploadModes } from '../upload-modes.enum';
import { Subject, Observable } from 'rxjs';
import { EntityOp } from 'ngrx-data';
import { map, delay, takeUntil } from 'rxjs/operators';
import { PodcastStoreService } from '../podcast-store.service';

@Component({
    selector: 'app-entry-upload',
    templateUrl: './entry-upload.component.html',
    styleUrls: ['./entry-upload.component.scss']
})
export class EntryUploadComponent {
    uploadModes = UploadModes; // do this so it can be used in the template

    @Input() uploadMode: UploadModes;
    @Input() podcast: Podcast;

    constructor(private podcastStoreService: PodcastStoreService) {}

    onEntryCreateComplete(entry: PodcastEntry) {
        this.uploadMode = this.uploadModes.none;
        this.podcast.podcastEntries.unshift(entry);
        this.podcastStoreService.updateOneInCache(this.podcast);
    }
    processPlaylist() {}
}
