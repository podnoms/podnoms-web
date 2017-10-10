import { SignalRService } from './../../../services/signalr.service';
import { PodcastModel } from '../../../models/podcasts.models';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PodcastEntryModel } from '../../../models/podcasts.models';
import { ToastyService } from 'ng2-toasty';

@Component({
    selector: 'app-entry-list-item',
    templateUrl: './entry-list-item.component.html',
    styleUrls: ['./entry-list-item.component.css']
})
export class EntryListItemComponent implements OnInit {

    @Input() entry: PodcastEntryModel;
    @Output() entryRemoved = new EventEmitter<PodcastEntryModel>();

    percentageProcessed = 0;
    currentSpeed: '0 kb/s';

    constructor(
        private _signalrService: SignalRService,
        private _toastyService: ToastyService) {
    }

    ngOnInit() {
        if (!this.entry.processed && this.entry.processingStatus !== 'Failed') {
            const that = this;
            /*
            this._pusherService.subscribeMessage(this.entry.uid + '__process_podcast', 'info_processed', t => {
                this.entry = t;
            });
            this._pusherService.subscribeMessage(this.entry.uid + '__process_podcast', 'info_progress', t => {
                console.log('EntryListItemComponent', 'info_progress', t);
                this.percentageProcessed = t.percentage;
                this.currentSpeed = t.currentSpeed;
            });*/
        }
    }

    deleteEntry() {
        this.entryRemoved.emit(this.entry);
    }

    saveTitle($event: Event) {
    }
}
