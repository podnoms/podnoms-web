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
    ViewChild
} from '@angular/core';
import { PodcastEntry } from '../../core';
import { AudioService } from '../../core/audio.service';
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
declare var $: any;
@Component({
    selector: 'app-entry-list-item',
    templateUrl: './entry-list-item.component.html',
    styleUrls: ['./entry-list-item.component.scss']
})
export class EntryListItemComponent implements OnInit {
    @Input()
    entry: PodcastEntry;

    @Output()
    entryRemoved = new EventEmitter<PodcastEntry>();

    @ViewChild('shareDialog', { static: false })
    shareDialog: ElementRef;

    preparingDownload: boolean = false;
    percentageProcessed = 0;
    currentSpeed: string = '';
    playing: boolean = false;

    constructor(
        private modalService: NgbModal,
        private signalr: SignalRService,
        public audioService: AudioService,
        private entriesStore: EntriesStoreService,
        private podcastEntryDataService: EntryDataService,
        private downloader: AudioDownloadService,
        private alertService: AlertService,
        private cdr: ChangeDetectorRef
    ) {}
    ngOnInit() {
        if (
            this.entry &&
            !this.entry.processed &&
            this.entry.processingStatus !== 'Failed'
        ) {
            this.signalr
                .init('audioprocessing')
                .then(listener => {
                    listener
                        .on<AudioProcessingMessage>(
                            'audioprocessing',
                            this.entry.id
                        )
                        .subscribe((result: AudioProcessingMessage) => {
                            console.log(
                                'entry-list-item.component',
                                'audioprocessing',
                                result
                            );
                            this.entry.processingStatus = AudioProcessingMessage.getProcessingStatus(
                                result.processingStatus
                            );
                            if (
                                this.entry.processingStatus === 'Downloading' ||
                                this.entry.processingStatus === 'Uploading'
                            ) {
                                this.percentageProcessed =
                                    result.payload.percentage;
                                this.currentSpeed = result.payload.currentSpeed;
                            }
                            this.cdr.detectChanges();
                        });
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

    __fixTitleEdit() {
        $('.fa-remove')
            .removeClass('fa-remove')
            .addClass('fa-times');
    }
    deleteEntry() {
        this.entryRemoved.emit(this.entry);
    }
    updateTitle($event: Event) {
        this.podcastEntryDataService
            .updateEntry(this.entry)
            .subscribe(e => this.entriesStore.updateOneInCache(e));
    }
    goto(entry: PodcastEntry) {
        window.open(entry.sourceUrl);
    }
    retry(entry: PodcastEntry) {
        this.podcastEntryDataService.reSubmitEntry(entry).subscribe(r => {
            this.entry = r;
            this.alertService.info(
                'Success',
                'Submitted podcast for re-processing'
            );
        });
    }
    playAudio(source: string) {
        this.audioService.playStateChanged.subscribe(r => {
            this.playing = r === 1;
        });
        if (!this.playing) {
            this.audioService.playAudio(this.entry.audioUrl, this.entry.title);
        } else {
            this.audioService.pauseAudio();
        }
    }
    createObjectURL(file) {
        return window.URL.createObjectURL(file);
    }
    downloadAudio(entry: PodcastEntry) {
        this.preparingDownload = true;
        this.downloader
            .downloadAudio(this.entry.id)
            .subscribe(
                r => (this.preparingDownload = false),
                err =>
                    this.alertService.error(
                        'Error',
                        'Unable to download this episode'
                    )
            );
    }
    shareEpisode(entry: PodcastEntry) {
        this.modalService
            .open(this.shareDialog)
            .result.then(
                result =>
                    console.log(
                        'entry-list-item.component',
                        'shareEpisode-result',
                        result
                    ),
                reason =>
                    console.log(
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
