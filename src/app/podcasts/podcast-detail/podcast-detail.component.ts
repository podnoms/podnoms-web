import {
    Component,
    Input,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    OnChanges,
    SimpleChanges,
    OnInit,
} from '@angular/core';

import { Podcast, PodcastEntry } from '../../core';
import { PodcastStoreService } from '../podcast-store.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { EntryDataService } from '../entry-data.service';
import { AlertService } from '../../core/alerts/alert.service';
import { DragDropService } from '../../shared/services/drag-drop.service';
import { NGXLogger } from 'ngx-logger';
import { SignalRService } from 'app/shared/services/signal-r.service';
import { RealtimeUpdate } from '../../core/model/realtime-update';

@Component({
    selector: 'app-podcast-detail',
    templateUrl: './podcast-detail.component.html',
    styleUrls: ['./podcast-detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger('fade', [
            transition('void => *', [
                style({ opacity: '0' }),
                animate('1s ease-out', style({ opacity: '1' })),
            ]),
            transition('* => void', [
                style({ opacity: '1' }),
                animate('.2s ease-in', style({ opacity: '0' })),
            ]),
        ]),
    ],
})
export class PodcastDetailComponent implements OnInit, OnChanges {
    @Input() podcast: Podcast;

    constructor(
        private podcastStore: PodcastStoreService,
        private podcastEntryDataService: EntryDataService,
        private dragDropService: DragDropService,
        private alertService: AlertService,
        private cdRef: ChangeDetectorRef,
        private signalr: SignalRService,
        private logger: NGXLogger
    ) {}

    ngOnInit() {
        this.signalr
            .init('rtd')
            .then((listener) => {
                listener
                    .on<RealtimeUpdate>('rtd', 'podcast-entry-added')
                    .subscribe((message) => {
                        this.logger.debug(
                            'podcast-detail.component',
                            'hub-Sync',
                            message
                        );
                        this.podcastEntryDataService
                            .getById(message.id)
                            .subscribe((entry) => {
                                this.logger.debug(
                                    'podcast-detail.component',
                                    'pushing entry',
                                    entry
                                );
                                setTimeout(() => {
                                    this.logger.debug(
                                        'podcast-detail.component',
                                        'before',
                                        this.podcast.podcastEntries
                                    );
                                    const e = this.podcast.podcastEntries.find(
                                        (r) => r.id === entry.id
                                    );
                                    if (!e) {
                                        this.podcast.podcastEntries.push(entry);
                                        this.cdRef.detectChanges();
                                    }
                                    this.logger.debug(
                                        'podcast-detail.component',
                                        'after',
                                        this.podcast.podcastEntries
                                    );
                                });
                            });
                    });
            })
            .catch((err) => {
                this.logger.error(
                    'app.component',
                    'Unable to initialise site update hub',
                    err
                );
            });
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.logger.debug('podcast-detail.component', 'ngOnChanges', changes);
    }
    // definitely a smell here - change detection
    // seems to have become "not" automatic
    public detectChanges() {
        this.cdRef.detectChanges();
    }
    updateEntry(entry) {
        this.logger.debug('podcast-detail.component', 'updateEntry', entry);
        this.detectChanges();
    }
    deleteEntry(entry: PodcastEntry) {
        this.podcastEntryDataService.deleteEntry(entry.id).subscribe(
            () => {
                this.podcast.podcastEntries = this.podcast.podcastEntries.filter(
                    (obj) => obj.id !== entry.id
                );
                this.podcastStore.updateOneInCache(this.podcast);
                this.cdRef.detectChanges();
            },
            () =>
                this.alertService.error(
                    'Error deleting entry',
                    'Please refresh page and try again'
                )
        );
    }
    dragStart($event: DragEvent, entry: PodcastEntry) {
        $event.dataTransfer.setData('text/plain', JSON.stringify(entry));
        this.dragDropService.dragEvents.emit('argle');
    }
}
