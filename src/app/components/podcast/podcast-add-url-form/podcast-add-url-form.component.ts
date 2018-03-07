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
            const entry = new PodcastEntryModel(
                this.podcast.id,
                urlToCheck
            );
            this._service.addEntry(entry)
                .subscribe(e => {
                    if (e) {
                        this.onUrlAddComplete.emit(e);
                    }
                }, (err) => {
                    this.isPosting = false;
                    this.errorText = 'This does not look like a valid URL';
                    this.newEntrySourceUrl = urlToCheck;
                });
        } else {
            this.isPosting = false;
            this.errorText = 'This does not look like a valid URL';
            this.newEntrySourceUrl = urlToCheck;
        }
    }
}
