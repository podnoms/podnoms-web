import { ApplicationState } from './../../../store/index';
import { Store } from '@ngrx/store';
import { SignalRService } from './../../../services/signalr.service';
import { PodcastModel } from '../../../models/podcasts.models';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PodcastEntryModel } from '../../../models/podcasts.models';
import { ToastyService } from 'ng2-toasty';

import * as fromEntriesActions from 'app/actions/entries.actions';

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
        private _store: Store<ApplicationState>,
        private _toastyService: ToastyService) {
        _signalrService.init('http://localhost:5000/hubs/audioprocessing');
    }

    ngOnInit() {
        if (!this.entry.processed && this.entry.processingStatus !== 'Failed') {
            const that = this;

            const progessEventName = `${this.entry.uid}__progress_update`;
            this._signalrService.connection.on(progessEventName, (result) => {
                console.log('EntryListItemComponent', progessEventName, result);
                this.percentageProcessed = result.percentage;
                this.currentSpeed = result.currentSpeed;
            });

            const updateEventName = `${this.entry.uid}__info_processed`;
            this._signalrService.connection.on(updateEventName, (result) => {
                console.log('EntryListItemComponent', updateEventName, result);
                this._store.dispatch(new fromEntriesActions.UpdateSuccessAction(result));
            });
        }
    }

    deleteEntry() {
        this._store.dispatch(new fromEntriesActions.DeleteAction(this.entry.id));
    }

    saveTitle($event: Event) {
    }
}
