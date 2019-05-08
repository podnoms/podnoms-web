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
    @Output() uploadModeChange = new EventEmitter();
    @Input() podcast: Podcast;

    constructor(private podcastStore: PodcastStoreService) {}

    onEntryCreateComplete(entry: PodcastEntry) {
        this.uploadMode = this.uploadModes.none;
        if (entry !== null) {
            // file was not passed correctly, probably an unsupported type
            this.podcast.podcastEntries.unshift(entry);
            this.podcastStore.updateOneInCache(this.podcast);
        }
        this.uploadModeChange.emit(this.uploadMode);
    }
    processPlaylist() {
        this.uploadMode = this.uploadModes.none;
    }
}
