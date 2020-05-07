import { EntryDeleteItemModalComponent } from './entry-delete-item-modal.component';
import {
    Component,
    OnInit,
    Input,
    EventEmitter,
    Output,
    SimpleChanges,
    OnChanges,
    ChangeDetectorRef,
    ElementRef,
    ViewChild,
} from '@angular/core';
import { PodcastEntry } from '../../core';
import { AudioService, PlayState } from '../../core/audio.service';
import { SignalRService } from '../../shared/services/signal-r.service';
import { AudioProcessingMessage } from '../../core/model/audio';
import { EntriesStoreService } from '../entries-store.service';
import { PodcastDataService } from '../podcast-data.service';
import { Router } from '@angular/router';
import { EntryDataService } from '../entry-data.service';
import { AudioDownloadService } from '../../shared/services/audio-download.service';
import { AlertService } from '../../core/alerts/alert.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../../shared/components/toast/toast.service';
import { NowPlaying } from 'app/core/model/now-playing';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { EntryLogsComponent } from '../entry-logs/entry-logs.component';
import { NGXLogger } from 'ngx-logger';
declare var $: any;
@Component({
    selector: 'app-entry-list-item',
    templateUrl: './entry-list-item.component.html',
    styleUrls: ['./entry-list-item.component.scss'],
})
export class EntryListItemComponent implements OnInit {
    @Input()
    entry: PodcastEntry;

    @Output()
    entryRemoved = new EventEmitter<PodcastEntry>();

    @Output()
    entryUpdated = new EventEmitter<PodcastEntry>();

    @ViewChild('shareDialog')
    shareDialog: ElementRef;

    preparingDownload: boolean = false;
    percentageProcessed = 0;
    currentSpeed: string = '';
    playing: boolean = false;
    narrative: string = '';
    playStates = PlayState;
    playState$ = new BehaviorSubject<PlayState>(PlayState.none);
    playStateSub$: Subscription;

    constructor(
        private modalService: NgbModal,
        private signalr: SignalRService,
        public audioService: AudioService,
        private entriesStore: EntriesStoreService,
        private podcastEntryDataService: EntryDataService,
        private downloader: AudioDownloadService,
        private alertService: AlertService,
        private cdr: ChangeDetectorRef,
        private logger: NGXLogger
    ) {}
    ngOnInit() {
        if (
            this.entry &&
            !this.entry.processed &&
            this.entry.processingStatus !== 'Failed'
        ) {
            this.signalr
                .init('audioprocessing')
                .then((listener) => {
                    listener
                        .on<AudioProcessingMessage>(
                            'audioprocessing',
                            this.entry.id
                        )
                        .subscribe((result: AudioProcessingMessage) => {
                            this.entry.processingStatus = AudioProcessingMessage.getProcessingStatus(
                                result.processingStatus
                            );
                            this.narrative = result.progress;
                            if (
                                this.entry.processingStatus === 'Downloading' ||
                                this.entry.processingStatus === 'Caching' ||
                                this.entry.processingStatus === 'Uploading'
                            ) {
                                this.percentageProcessed =
                                    result.payload.percentage;
                                this.currentSpeed = result.payload.currentSpeed;
                            } else if (
                                this.entry.processingStatus === 'Processed'
                            ) {
                                this.entry = result.payload;
                            }
                            this.entryUpdated.emit(this.entry);
                            this.cdr.detectChanges();
                        });
                })
                .catch((err) =>
                    this.logger.error(
                        'entry-list-item.component.ts',
                        '_signalrService.init',
                        err
                    )
                );
        }
    }
    playAudio() {
        this.audioService.playAudio(
            new NowPlaying(this.entry.audioUrl, this.entry)
        );
        this.playStateSub$ = this.audioService.playState$.subscribe((r) => {
            this.playState$.next(r);
            if (r === PlayState.none && this.playStateSub$ !== null) {
                this.playStateSub$.unsubscribe();
            }
        });
    }
    __fixTitleEdit() {
        $('.fa-remove').removeClass('fa-remove').addClass('fa-times');
    }
    showEntryDeleteDialog() {
        const modalRef = this.modalService.open(EntryDeleteItemModalComponent);
        modalRef.componentInstance.entry = this.entry;
        modalRef.result.then((r) => {
            if (r === 'delete') {
                this.entryRemoved.emit(this.entry);
            }
        });
    }
    deleteEntry() {}
    updateTitle($event: Event) {
        this.podcastEntryDataService
            .updateEntry(this.entry)
            .subscribe((e) => this.entriesStore.updateOneInCache(e));
    }
    goto(entry: PodcastEntry) {
        window.open(entry.sourceUrl);
    }
    retry(entry: PodcastEntry) {
        this.podcastEntryDataService.reSubmitEntry(entry).subscribe((r) => {
            this.entry = r;
            this.alertService.info(
                'Success',
                'Submitted podcast for re-processing'
            );
        });
    }
    createObjectURL(file) {
        return window.URL.createObjectURL(file);
    }
    downloadAudio(entry: PodcastEntry) {
        this.preparingDownload = true;
        this.downloader.downloadAudio(this.entry.id).subscribe(
            (r) => {
                this.preparingDownload = false;
            },
            (err) =>
                this.alertService.error(
                    'Error',
                    'Unable to download this episode'
                )
        );
    }
    showLogs(entry: PodcastEntry) {
        const modalRef = this.modalService.open(EntryLogsComponent, {
            windowClass: 'full-modal',
            size: 'xl',
        });
        modalRef.componentInstance.entry = this.entry;
    }
    closeLogs() {
        this.modalService.dismissAll();
    }
    shareEpisode(entry: PodcastEntry) {
        this.modalService.open(this.shareDialog, { size: 'lg' }).result.then(
            (result) =>
                this.logger.debug(
                    'entry-list-item.component',
                    'shareEpisode-result',
                    result
                ),
            (reason) =>
                this.logger.debug(
                    'entry-list-item.component',
                    'shareEpisode-reason',
                    reason
                )
        );
    }
    shareComplete(result) {
        this.modalService.dismissAll();
        if (result) {
            this.alertService.success('Success', 'Entry shared successfully');
        }
    }
}
