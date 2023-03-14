import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnChanges,
  SimpleChanges,
  OnInit,
  Output,
  EventEmitter,
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
import { UploadMode as UploadMode } from '../upload-mode.enum';

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
export class PodcastDetailComponent implements OnInit {
  UPLOADMODE = UploadMode;
  @Input() podcast: Podcast;
  @Output() fromUrlClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() fromLocalFileClick: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  fromProviderClick: EventEmitter<UploadMode> = new EventEmitter<UploadMode>();

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
            this.podcastEntryDataService
              .getById(message.id)
              .subscribe((entry) => {
                setTimeout(() => {
                  this.podcast.podcastEntries.unshift(entry);
                  this.cdRef.detectChanges();
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

  // definitely a smell here - change detection
  // seems to have become "not" automatic
  public detectChanges() {
    this.cdRef.detectChanges();
  }
  updateEntry(entry) {
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
  uploadFromUrl($event: any) {
    if (this.fromUrlClick) {
      this.fromUrlClick.emit($event);
    }
  }
  uploadFromFile($event: any) {
    if (this.fromLocalFileClick) {
      this.fromLocalFileClick.emit($event);
    }
  }
  uploadProvider(provider: UploadMode) {
    if (this.fromProviderClick) {
      this.fromProviderClick.emit(provider);
    }
  }
}
