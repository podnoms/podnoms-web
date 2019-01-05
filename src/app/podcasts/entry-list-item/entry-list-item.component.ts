import {
    Component,
    OnInit,
    Input,
    EventEmitter,
    Output,
    SimpleChanges,
    OnChanges,
    ChangeDetectorRef
} from '@angular/core';
import { PodcastEntry, ToastService } from '../../core';
import { AudioService } from '../../core/audio.service';
import { SignalRService } from '../../shared/services/signal-r.service';
import { AudioProcessingMessage } from '../../core/model/audio';
import { EntriesStoreService } from '../entries-store.service';
import { PodcastDataService } from '../podcast-data.service';
import { Router } from '@angular/router';
import { EntryDataService } from '../entry-data.service';
declare var $: any;
@Component({
    selector: '[app-entry-list-item]',
    templateUrl: './entry-list-item.component.html',
    styleUrls: ['./entry-list-item.component.scss']
})
export class EntryListItemComponent implements OnInit {
    @Input()
    entry: PodcastEntry;

    @Output()
    entryRemoved = new EventEmitter<PodcastEntry>();

    preparingDownload: boolean = false;
    percentageProcessed = 0;
    currentSpeed: string = '';
    playing: boolean = false;

    constructor(
        private router: Router,
        private signalr: SignalRService,
        public audioService: AudioService,
        private entriesStore: EntriesStoreService,
        private podcastEntryDataService: EntryDataService,
        private notifier: ToastService,
        private cdr: ChangeDetectorRef
    ) {}
    ngOnInit() {
        if (this.entry && !this.entry.processed && this.entry.processingStatus !== 'Failed') {
            this.signalr
                .init('audioprocessing')
                .then(listener => {
                    const updateChannel: string = `${this.entry.id}__progress_update`;
                    const processedChannel: string = `${this.entry.id}__info_processed`;
                    listener.on<AudioProcessingMessage>('audioprocessing', updateChannel).subscribe(result => {
                        this.percentageProcessed = result.percentage;
                        this.currentSpeed = result.currentSpeed;
                        this.cdr.detectChanges();
                    });
                    listener.on<PodcastEntry>('audioprocessing', processedChannel).subscribe(result => {
                        this.entry = result;
                        if (this.entry.processingStatus === 'Processed') {
                            this.entriesStore.updateOneInCache(this.entry);
                            this.cdr.detectChanges();
                        }
                    });
                })
                .catch(err => console.error('entry-list-item.component.ts', '_signalrService.init', err));
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
        this.podcastEntryDataService.updateEntry(this.entry).subscribe(e => this.entriesStore.updateOneInCache(e));
    }
    goto(entry: PodcastEntry) {
        window.open(entry.sourceUrl);
    }
    retry(entry: PodcastEntry) {
        this.podcastEntryDataService.reSubmitEntry(entry).subscribe(r => {
            this.entry = r;
            this.notifier.showToast('Success', 'Submitted podcast for re-processing');
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
        const that = this;
        this.preparingDownload = true;
        const xhr = new XMLHttpRequest();
        xhr.open('GET', entry.audioUrl, true);
        xhr.responseType = 'blob';

        xhr.onload = function(e) {
            if (this['status'] === 200) {
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
                setTimeout(() => (that.preparingDownload = false), 500);
            }
        };
        xhr.send();
    }
}
