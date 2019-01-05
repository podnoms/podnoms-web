import { Component, EventEmitter, Input, Output, ViewChild, AfterViewInit } from '@angular/core';
import { Podcast, PodcastEntry, ToastService } from '../../../core';
import { EntryDataService } from '../../entry-data.service';

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
    constructor(private podcastEntryDataService: EntryDataService, private toastService: ToastService) {}
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
        this.podcastEntryDataService.addPlaylist(entry).subscribe(
            e => {
                this.resetUrl();
                this.playlistAdded.emit(e);
            },
            () =>
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

        // TODO: Send URL to the server and let it figure out it's authenticity
        // get rid of the creating a PodcastEntry and seeing if it saves as validation, that's icky!

        // server should return a result that says either
        // 1. This URL is fine
        // 2. This URL contains multiple audio files
        // 3. This URL is mince

        if (this.isValidURL(urlToCheck)) {
            this.isPosting = true;
            const entry = new PodcastEntry(this.podcast.id, urlToCheck);
            this.podcastEntryDataService.addEntry(entry).subscribe(
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
