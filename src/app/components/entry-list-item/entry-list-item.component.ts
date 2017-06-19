import {Component, OnInit, Input, NgZone} from '@angular/core';
import {PodcastEntryModel} from '../../models/podcasts.models';
import {PodcastsService} from '../../services/podcasts.service';
import {ToastyService} from 'ng2-toasty';
import {PusherService} from '../../services/pusher.service';

@Component({
    selector: '[app-entry-list-item]',
    templateUrl: './entry-list-item.component.html',
    styleUrls: ['./entry-list-item.component.css']
})
export class EntryListItemComponent implements OnInit {

    @Input() entry: PodcastEntryModel;
    percentageProcessed = 0;
    currentSpeed: string;

    constructor(private _service: PodcastsService, private _toastyService: ToastyService,
                private _pusherService: PusherService, private _zone: NgZone) {
    }

    ngOnInit() {
        if (!this.entry.processed && this.entry.processingStatus !== 'Failed') {
            console.log('EntryListItemComponent', 'ngOnInit()', this.entry);
            const that = this;
            this._pusherService.subscribeMessage(this.entry.uid + '__process_podcast', 'info_processed', t => {
                this.entry = t;
            });
            this._pusherService.subscribeMessage(this.entry.uid + '__process_podcast', 'info_progress', t => {
                console.log('EntryListItemComponent', 'info_progress', t);
                this.percentageProcessed = t.percentage;
                this.currentSpeed = t.currentSpeed;
            });
        }
    }

    removeEntry(entryId) {
        this._service.removePodcastEntry(entryId)
            .subscribe(result => {
                console.log('Podcast entry removed succesfully', result);
            }, error => {
                console.error(error);
                this._toastyService.error({
                    title: 'Warning',
                    msg: 'Unable to delete podcast entry.',
                    theme: 'bootstrap',
                    showClose: true,
                    timeout: 5000
                });
            });
    }
}
