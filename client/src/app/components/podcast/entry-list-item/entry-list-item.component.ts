import { environment } from 'environments/environment';
import { ApplicationState } from 'app/store/index';
import { Store } from '@ngrx/store';
import { SignalRService } from 'app/services/signalr.service';
import { PodcastModel, PodcastEntryModel } from 'app/models/podcasts.models';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToastyService, ToastData, ToastOptions } from 'ng2-toasty';

import * as fromEntriesActions from 'app/actions/entries.actions';
import { PodcastService } from '../../../services/podcast.service';

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
        private _entryService: PodcastService,
        private _store: Store<ApplicationState>,
        private _toasty: ToastyService
    ) {}
    ngOnInit() {
        if (
            this.entry &&
            !this.entry.processed &&
            this.entry.processingStatus !== 'Failed'
        ) {
            const signalRHost = `${
                environment.SIGNALR_HOST
            }hubs/audioprocessing`;

            console.log(
                'entry-list-item.component.ts',
                'ngOnInit',
                `Initting signalr: ${signalRHost}`
            );
            this._signalrService
                .init(signalRHost)
                .then(() => {
                    const updateChannel: string = `${
                        this.entry.uid
                    }__progress_update`;
                    const processedChannel: string = `${
                        this.entry.uid
                    }__info_processed`;
                    this._signalrService.connection.on(
                        updateChannel,
                        result => {
                            this.percentageProcessed = result.percentage;
                            this.currentSpeed = result.currentSpeed;
                        }
                    );
                    this._signalrService.connection.on(
                        processedChannel,
                        result => {
                            this.entry = result;
                            if (this.entry.processingStatus === 'Processed') {
                                // only update the store when we're finished.
                                this._store.dispatch(
                                    new fromEntriesActions.UpdateSuccessAction(
                                        result
                                    )
                                );
                            }
                        }
                    );
                })
                .catch(err =>
                    console.error(
                        'entry-list-item.component.ts',
                        '_signalrService.init',
                        err
                    )
                );
        }
    }
    deleteEntry() {
        this._store.dispatch(
            new fromEntriesActions.DeleteAction(this.entry.id)
        );
    }
    updateTitle($event: Event) {
        this._store.dispatch(new fromEntriesActions.UpdateAction(this.entry));
    }
    goto(entry: PodcastEntryModel) {
        window.open(entry.sourceUrl);
    }
    retry(entry: PodcastEntryModel) {
        this._entryService.reSubmitEntry(entry).subscribe(r => {
            this.entry = r;
            this._toasty.info('Submitted podcast for re-processing');
        });
    }
}
