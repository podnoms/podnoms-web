import { environment } from 'environments/environment';
import { ApplicationState } from 'app/store/index';
import { Store } from '@ngrx/store';
import { SignalRService } from 'app/services/signalr.service';
import { PodcastModel, PodcastEntryModel } from 'app/models/podcasts.models';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToastyService, ToastData, ToastOptions } from 'ng2-toasty';

import * as fromEntriesActions from 'app/actions/entries.actions';
import { PodcastService } from '../../../services/podcast.service';
import { AudioService } from 'app/services/audio.service';
import { Observable } from 'rxjs/Observable';

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
    playing: boolean = false;

    constructor(
        private _signalrService: SignalRService,
        private _audioService: AudioService,
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
            this._signalrService
                .init('audioprocessing')
                .then(() => {
                    const updateChannel: string = `${
                        this.entry.uid
                    }__progress_update`;
                    const processedChannel: string = `${
                        this.entry.uid
                    }__info_processed`;
                    this._signalrService.connection.on(
                        updateChannel,
                        (result) => {
                            this.percentageProcessed = result.percentage;
                            this.currentSpeed = result.currentSpeed;
                        }
                    );
                    this._signalrService.connection.on(
                        processedChannel,
                        (result) => {
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
                .catch((err) =>
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
        this._entryService.reSubmitEntry(entry).subscribe((r) => {
            this.entry = r;
            this._toasty.info('Submitted podcast for re-processing');
        });
    }
    playAudio(source: string) {
        this._audioService.playStateChanged.subscribe((r) => {
            this.playing = r == 1;
        });
        if (!this.playing) {
            this._audioService.playAudio(this.entry.audioUrl, this.entry.title);
        } else {
            this._audioService.pauseAudio();
        }
    }
    createObjectURL(file) {
        return window.URL.createObjectURL(file);
    }
    downloadAudio(entry: PodcastEntryModel) {
        // const link = document.createElement('a');
        // link.download = 'a';
        // link.href = entry.audioUrl;
        // document.body.appendChild(link);
        // link.click();
        const xhr = new XMLHttpRequest();
        xhr.open('GET', entry.audioUrl, true);
        xhr.responseType = 'blob';

        xhr.onload = function(e) {
            if (this['status'] == 200) {
                const url = window.URL.createObjectURL(
                    new Blob([this['response']], {
                        type: 'application/audio'
                    })
                );
                const link = document.createElement('A');
                link.setAttribute('href', url);
                link.setAttribute('download', `${entry.title}.mp3`);
                link.appendChild(document.createTextNode('Download'));
                document.getElementsByTagName('body')[0].appendChild(link);

                link.click();
            }
        };
        xhr.send();
    }
}
