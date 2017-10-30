import { environment } from 'environments/environment';
import { ApplicationState } from 'app/store/index';
import { Store } from '@ngrx/store';
import { SignalRService } from 'app/services/signalr.service';
import { PodcastModel } from 'app/models/podcasts.models';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PodcastEntryModel } from 'app/models/podcasts.models';
import { ToastyService } from 'ng2-toasty';

import * as fromEntriesActions from 'app/actions/entries.actions';

@Component({
    selector: '[app-entry-list-item]',
    templateUrl: './entry-list-item.component.html',
    styleUrls: ['./entry-list-item.component.css']
})
export class EntryListItemComponent implements OnInit {
    @Input() entry: PodcastEntryModel;
    @Output() entryRemoved = new EventEmitter<PodcastEntryModel>();

    percentageProcessed = 0;
    currentSpeed: string = '';

    constructor(private _signalrService: SignalRService, private _store: Store<ApplicationState>) {}
    ngOnInit() {
        if (!this.entry.processed && this.entry.processingStatus !== 'Failed') {
            this._signalrService.init(`${environment.signalRHost}hubs/audioprocessing`);

            const updateChannel: string = `${this.entry.uid}__progress_update`;
            const processedChannel: string = `${this.entry.uid}__info_processed`;
            console.log('EntryListItemComponent', 'updateChannel', updateChannel);
            console.log('EntryListItemComponent', 'processedChannel', processedChannel);

            this._signalrService.connection.on(updateChannel, result => {
                this.percentageProcessed = result.percentage;
                this.currentSpeed = result.currentSpeed;
            });
            this._signalrService.connection.on(processedChannel, result => {
                this._store.dispatch(new fromEntriesActions.UpdateSuccessAction(result));
            });
        }
    }
    deleteEntry() {
        this._store.dispatch(new fromEntriesActions.DeleteAction(this.entry.id));
    }
    updateTitle($event: Event) {
        this._store.dispatch(new fromEntriesActions.UpdateAction(this.entry));
    }
}
