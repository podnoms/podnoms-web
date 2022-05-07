import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Podcast, PodcastEntry } from '../../core';
import { UploadMode } from '../upload-mode.enum';
import { PodcastStoreService } from '../podcast-store.service';

@Component({
  selector: 'app-entry-upload',
  templateUrl: './entry-upload.component.html',
  styleUrls: ['./entry-upload.component.scss'],
})
export class EntryUploadComponent {
  UPLOADMODE = UploadMode; // do this so it can be used in the template

  @Input() uploadMode: UploadMode;
  @Output() uploadModeChange = new EventEmitter();
  @Input() podcast: Podcast;
  @Output() podcastUpdated = new EventEmitter<Podcast>();
  constructor(private podcastStore: PodcastStoreService) {}

  onEntryCreateComplete(entry: PodcastEntry) {
    this.uploadMode = this.UPLOADMODE.none;
    if (entry !== null) {
      this.podcast.podcastEntries.unshift(entry);
    }
    this.podcastStore.updateOneInCache(this.podcast);
    this.uploadModeChange.emit(this.uploadMode);
    this.podcastUpdated.emit(this.podcast);
  }
  processPlaylist() {
    this.uploadMode = this.UPLOADMODE.none;
  }
}
