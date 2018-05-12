import { PodcastModel, PodcastEntryModel } from 'app/models/podcasts.models';
import {
    Component,
    Input,
    EventEmitter,
    Output,
    AfterViewInit,
    ViewChild
} from '@angular/core';
import { PodcastService } from 'app/services/podcast.service';
import { debounceTime } from 'rxjs/operator/debounceTime';

@Component({
    selector: 'app-podcast-add-url-form',
    templateUrl: './podcast-add-url-form.component.html',
    styleUrls: ['./podcast-add-url-form.component.css']
})
export class PodcastAddUrlFormComponent implements AfterViewInit {
    @Input() podcast: PodcastModel;
    @Output()
    onUrlAddComplete: EventEmitter<any> = new EventEmitter();
    @Output()
    onPlaylistAdded: EventEmitter<any> = new EventEmitter();

    newEntrySourceUrl: string;
    errorText: string;
    isPosting: boolean = false;
    @ViewChild('input') vc: any;
    playlistProxy: PodcastEntryModel = null;
    constructor(private _service: PodcastService) {}
    ngAfterViewInit() {
        this.vc.nativeElement.focus();
    }
    isValidURL(str) {
        let a = document.createElement('a');
        a.href = str;
        return a.host && a.host != window.location.host;
    }
    processPlaylist() {
        this.onPlaylistAdded.emit(this.playlistProxy)
        this.resetUrl();
    }
    resetUrl() {
        this.playlistProxy = null;
        this.isPosting = false;
        this.newEntrySourceUrl = '';
    }
    addEntry(podcast: PodcastModel) {
        const urlToCheck = this.newEntrySourceUrl;
        this.newEntrySourceUrl = 'Checking (please wait).....';
        this.errorText = '';
        if (this.isValidURL(urlToCheck)) {
            this.isPosting = true;
            const entry = new PodcastEntryModel(this.podcast.id, urlToCheck);
            this._service.addEntry(entry).subscribe(
                (e) => {
                    if (e) {
                        if (e.processingStatus === 'Deferred') {
                            this.playlistProxy = e;
                        } else {
                            this.onUrlAddComplete.emit(e);
                        }
                    }
                },
                (err) => {
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
