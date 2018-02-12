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

@Component({
    selector: 'app-podcast-add-url-form',
    templateUrl: './podcast-add-url-form.component.html',
    styleUrls: ['./podcast-add-url-form.component.css']
})
export class PodcastAddUrlFormComponent implements AfterViewInit {
    @Input() podcast: PodcastModel;
    @Output() onUrlAddComplete: EventEmitter<any> = new EventEmitter();
    newEntrySourceUrl: string;
    errorText: string;
    isPosting: boolean = false;
    @ViewChild('input') vc: any;
    constructor(private _service: PodcastService) {}
    ngAfterViewInit() {
        this.vc.nativeElement.focus();
    }
    isValidURL(str) {
        var a = document.createElement('a');
        a.href = str;
        return a.host && a.host != window.location.host;
    }
    addEntry(podcast: PodcastModel) {
        const urlToCheck = this.newEntrySourceUrl;
        this.newEntrySourceUrl = 'Checking (please wait).....';
        this.errorText = '';
        if (this.isValidURL(urlToCheck)) {
            this.isPosting = true;
            this._service.checkEntry(urlToCheck).subscribe(
                r => {
                    if (r) {
                        const entry = new PodcastEntryModel(
                            this.podcast.id,
                            urlToCheck
                        );
                        this.onUrlAddComplete.emit(entry);
                        this.isPosting = false;
                        this.newEntrySourceUrl = urlToCheck;
                    } else {
                        this.errorText = 'This is not a supported URL';
                        this.isPosting = false;
                        this.newEntrySourceUrl = urlToCheck;
                    }
                },
                err => {
                    this.errorText = 'This is not a supported URL';
                    this.isPosting = false;
                    this.newEntrySourceUrl = urlToCheck;
                }
            );
        } else {
            this.errorText = 'This does not look like a valid URL';
            this.newEntrySourceUrl = urlToCheck;
        }
    }
}
