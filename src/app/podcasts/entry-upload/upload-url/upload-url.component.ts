import { Component, EventEmitter, Input, Output, ViewChild, AfterViewInit } from '@angular/core';
import { Podcast, PodcastEntry, ToastService } from '../../../core';
import { EntriesStoreService } from '../../entries-store.service';
import { PodcastDataService } from '../../podcast-data.service';

@Component({
    selector: 'app-upload-url',
    templateUrl: './upload-url.component.html',
    styleUrls: ['./upload-url.component.scss']
})
export class UploadUrlComponent implements AfterViewInit {
    @Input()
    podcast: Podcast;
    @Output()
    entryCreateComplete: EventEmitter<any> = new EventEmitter();
    @Output()
    playlistAdded: EventEmitter<any> = new EventEmitter();

    newEntrySourceUrl: string;
    errorText: string;
    isPosting: boolean = false;
    @ViewChild('input')
    vc: any;
    playlistProxy: PodcastEntry = null;
    constructor(private podcastDataService: PodcastDataService, private toastService: ToastService) {}
    ngAfterViewInit() {
        this.vc.nativeElement.focus();
    }
    isValidURL(str) {
        const a = document.createElement('a');
        a.href = str;
        return a.host && a.host !== window.location.host;
    }
    processPlaylist() {
        const entry = new PodcastEntry(this.podcast.id, this.playlistProxy.sourceUrl);
        this.podcastDataService.addPlaylist(entry).subscribe(
            e => {
                this.resetUrl();
                this.playlistAdded.emit(e);
            },
            err =>
                this.toastService.showError(
                    'Error creating playlist',
                    'There was an error adding this playlist, please refresh page and try again'
                )
        );
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
            this.isPosting = true;
            const entry = new PodcastEntry(this.podcast.id, urlToCheck);
            this.podcastDataService.addEntry(entry).subscribe(
                e => {
                    if (e) {
                        if (e.processingStatus === 'Deferred') {
                            this.playlistProxy = e;
                        } else {
                            this.entryCreateComplete.emit(e);
                        }
                    }
                },
                err => {
                    this.isPosting = false;
                    if (err.status === 402) {
                        this.errorText =
                            'You have exceeded your allowable storage quota, please upgrade to a paid tier';
                    } else {
                        this.errorText = 'This does not look like a valid URL';
                    }
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
