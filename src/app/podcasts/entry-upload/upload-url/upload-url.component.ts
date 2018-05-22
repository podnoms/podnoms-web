import { Component, EventEmitter, Input, Output, ViewChild, AfterViewInit } from '@angular/core';
import { Podcast, PodcastEntry } from '../../../core';
import { EntriesStoreService } from '../../entries-store.service';
import { PodcastDataService } from '../../podcast-data.service';

@Component({
    selector: 'app-upload-url',
    templateUrl: './upload-url.component.html',
    styleUrls: ['./upload-url.component.scss']
})
export class UploadUrlComponent implements AfterViewInit {
    @Input() podcast: Podcast;
    @Output() onEntryCreateComplete: EventEmitter<any> = new EventEmitter();
    @Output() onPlaylistAdded: EventEmitter<any> = new EventEmitter();

    newEntrySourceUrl: string;
    errorText: string;
    isPosting: boolean = false;
    @ViewChild('input') vc: any;
    playlistProxy: PodcastEntry = null;
    constructor(private podcastDataService: PodcastDataService) {}
    ngAfterViewInit() {
        this.vc.nativeElement.focus();
    }
    isValidURL(str) {
        let a = document.createElement('a');
        a.href = str;
        return a.host && a.host != window.location.host;
    }
    processPlaylist() {
        this.onPlaylistAdded.emit(this.playlistProxy);
        this.resetUrl();
    }
    resetUrl() {
        this.playlistProxy = null;
        this.isPosting = false;
        this.newEntrySourceUrl = '';
    }
    addEntry() {
        const urlToCheck = this.newEntrySourceUrl;
        this.newEntrySourceUrl = 'Checking (please wait).....';
        this.errorText = '';

        if (this.isValidURL(urlToCheck)) {
            this.podcast;
            this.isPosting = true;
            const entry = new PodcastEntry(this.podcast.id, urlToCheck);
            this.podcastDataService.addEntry(entry).subscribe(
                e => {
                    if (e) {
                        if (e.processingStatus === 'Deferred') {
                            this.playlistProxy = e;
                        } else {
                            this.onEntryCreateComplete.emit(e);
                        }
                    }
                },
                err => {
                    this.isPosting = false;
                    this.errorText = 'This does not look like a valid URL';
                    this.newEntrySourceUrl = urlToCheck;
                }
            );
        } else {
            this.isPosting = false;
            this.errorText = 'This does not look like a valid URL';
            this.newEntrySourceUrl = urlToCheck;
        }
    }
}
