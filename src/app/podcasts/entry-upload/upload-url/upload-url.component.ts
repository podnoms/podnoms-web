import {
    Component,
    EventEmitter,
    Input,
    Output,
    ViewChild,
    AfterViewInit
} from '@angular/core';
import { Podcast, PodcastEntry } from '../../../core';
import { EntryDataService } from '../../entry-data.service';
import { UtilityService } from '../../../shared/services/utility.service';
import { AlertService } from '../../../core/alerts/alert.service';

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
    progressText: string = 'Checking URL...';
    isPosting: boolean = false;
    remoteAudioResult: any = null;

    @ViewChild('input', { static: false })
    vc: any;

    playlistProxy: PodcastEntry = null;
    constructor(
        private podcastEntryDataService: EntryDataService,
        private utilityService: UtilityService,
        private alertService: AlertService
    ) {
        console.log('upload-url.component', 'ctor');
    }
    ngAfterViewInit() {
        // this.vc.nativeElement.focus();
    }
    isValidURL(str) {
        const a = document.createElement('a');
        a.href = str;
        return a.host && a.host !== window.location.host;
    }
    processPlaylist() {
        const entry = new PodcastEntry(
            this.podcast.id,
            this.playlistProxy.sourceUrl
        );
        this.podcastEntryDataService.addPlaylist(entry).subscribe(
            e => {
                this.resetUrl();
                this.playlistAdded.emit(e);
            },
            error => {
                this.playlistProxy = null;
                this.isPosting = false;
                this.errorText = error.error;
                // this.alertService.error('Error creating playlist', error.error);
            }
        );
    }
    resetUrl() {
        this.playlistProxy = null;
        this.isPosting = false;
        this.remoteAudioResult = null;
        this.newEntrySourceUrl = '';
    }
    addEntry() {
        const url = this.newEntrySourceUrl;
        this.progressText = 'Checking URL...';
        this.errorText = '';

        // TODO: Send URL to the server and let it figure out it's authenticity
        // get rid of the creating a PodcastEntry and seeing if it saves as validation, that's icky!

        // server should return a result that says either
        // 1. This URL is fine
        // 2. This URL contains multiple audio files
        // 3. This URL is mince

        if (this.isValidURL(url)) {
            this.isPosting = true;
            this.utilityService.checkAudioUrl(url).subscribe(
                r => {
                    if (r.type === 'native') {
                        this.createEntry(r, url);
                    } else if ((r.type = 'proxied')) {
                        console.log('upload-url.component', 'apiData', r.data);
                        this.isPosting = false;
                        this.remoteAudioResult = r;
                    }
                },
                err => {
                    this.isPosting = false;
                    this.errorText =
                        'Could not find any supported audio at that URL';
                    this.resetUrl();
                }
            );
        } else {
            this.errorText = 'This does not look like a valid URL';
            this.resetUrl();
        }
    }
    onPageEntryChosen($event) {
        console.log('upload-url.component', 'YAY', $event);
        if ($event) {
            this.createEntry(this.remoteAudioResult, $event);
        } else {
            this.resetUrl();
        }
    }
    createEntry(parsedEntry: any, url: string) {
        // TODO: API should tell us that this is a playlist without calling addEntry
        this.progressText = 'Creating entry';
        const entry = new PodcastEntry(this.podcast.id, url);
        entry.title = parsedEntry.title;
        entry.description = parsedEntry.description;
        entry.imageUrl = parsedEntry.image;
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
                this.newEntrySourceUrl = url;
            }
        );
    }
}
