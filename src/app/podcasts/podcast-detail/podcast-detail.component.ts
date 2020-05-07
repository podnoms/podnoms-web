import {
    Component,
    Input,
    ChangeDetectionStrategy,
    AfterViewInit,
    ChangeDetectorRef,
    OnChanges,
    SimpleChanges
} from '@angular/core';

import { Podcast, PodcastEntry } from '../../core';
import { PodcastStoreService } from '../podcast-store.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { EntriesStoreService } from '../entries-store.service';
import { EntryDataService } from '../entry-data.service';
import { AlertService } from '../../core/alerts/alert.service';
import { DragDropService } from '../../shared/services/drag-drop.service';
import { NgxFancyLoggerService } from 'ngx-fancy-logger';

@Component({
    selector: 'app-podcast-detail',
    templateUrl: './podcast-detail.component.html',
    styleUrls: ['./podcast-detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger('fade', [
            transition('void => *', [
                style({ opacity: '0' }),
                animate('1s ease-out', style({ opacity: '1' }))
            ]),
            transition('* => void', [
                style({ opacity: '1' }),
                animate('.2s ease-in', style({ opacity: '0' }))
            ])
        ])
    ]
})
export class PodcastDetailComponent implements AfterViewInit, OnChanges {
    @Input() podcast: Podcast;

    constructor(
        private podcastStore: PodcastStoreService,
        private podcastEntryDataService: EntryDataService,
        private dragDropService: DragDropService,
        private alertService: AlertService,
        private cdRef: ChangeDetectorRef,
        private logger: NgxFancyLoggerService
    ) {}

    ngAfterViewInit() {}

    ngOnChanges(changes: SimpleChanges): void {
        this.logger.debug('podcast-detail.component', 'ngOnChanges', changes);
    }
    // definitely a smell here - change detection
    // seems to have become "not" automatic
    public detectChanges() {
        this.cdRef.detectChanges();
    }
    updateEntry(entry: PodcastEntry) {
        this.detectChanges();
    }
    deleteEntry(entry: PodcastEntry) {
        this.podcastEntryDataService.deleteEntry(entry.id).subscribe(
            () => {
                this.podcast.podcastEntries = this.podcast.podcastEntries.filter(
                    obj => obj.id !== entry.id
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
