import { environment } from './../../../../environments/environment';
import { ApplicationState } from './../../../store/index';
import { Store } from '@ngrx/store';
import { SignalRService } from './../../../services/signalr.service';
import { PodcastModel } from '../../../models/podcasts.models';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PodcastEntryModel } from '../../../models/podcasts.models';
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

    constructor(
        private _signalrService: SignalRService,
        private _store: Store<ApplicationState>) {

    }
    ngOnInit() {
        if (!this.entry.processed && this.entry.processingStatus !== 'Failed') {
            this._signalrService.init(`${environment.apiHost}hubs/audioprocessing`);
            this._signalrService.connection.on(`${this.entry.uid}__progress_update`, (result) => {
                this.percentageProcessed = result.percentage;
                this.currentSpeed = result.currentSpeed;
            });
            this._signalrService.connection.on(`${this.entry.uid}__info_processed`, (result) => {
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
