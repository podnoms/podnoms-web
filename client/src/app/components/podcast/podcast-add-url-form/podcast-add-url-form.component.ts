import { PodcastModel, PodcastEntryModel } from 'app/models/podcasts.models';
import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-podcast-add-url-form',
    templateUrl: './podcast-add-url-form.component.html',
    styleUrls: ['./podcast-add-url-form.component.css']
})
export class PodcastAddUrlFormComponent {
    @Input() podcast: PodcastModel;
    @Output() onUrlAddComplete: EventEmitter<any> = new EventEmitter();
    newEntrySourceUrl: string;

    constructor() {}

    addEntry(podcast: PodcastModel) {
        const entry = new PodcastEntryModel(this.podcast.id, this.newEntrySourceUrl);
        this.onUrlAddComplete.emit(entry);
    }
}
