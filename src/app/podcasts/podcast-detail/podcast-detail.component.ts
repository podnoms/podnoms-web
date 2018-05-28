import {
    Component,
    Input,
    ElementRef,
    OnChanges,
    ViewChild,
    SimpleChanges,
    ChangeDetectionStrategy,
    SimpleChange
} from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { Podcast, MasterDetailCommands, PodcastEntry, ToastService } from '../../core';
import { Observable, BehaviorSubject } from 'rxjs';
import { PodcastStoreService } from '../podcast-store.service';
import { map, debounceTime } from 'rxjs/operators';
import { Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { EntityActions, persistOps, EntityAction, EntityOp } from 'ngrx-data';
import { PodcastDataService } from '../podcast-data.service';

@Component({
    selector: 'app-podcast-detail',
    templateUrl: './podcast-detail.component.html',
    styleUrls: ['./podcast-detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PodcastDetailComponent {
    @Input() podcast: Podcast;

    constructor(
        private podcastStoreService: PodcastStoreService,
        private podcastDataService: PodcastDataService,
        private toastService: ToastService,
        private actions$: EntityActions
    ) {}

    deleteEntry(entry: PodcastEntry) {
        this.podcastDataService.deleteEntry(entry.id).subscribe(
            r => {
                this.podcast.podcastEntries = this.podcast.podcastEntries.filter(
                    p => p.id !== entry.id
                );
                this.podcastStoreService.updateOneInCache(this.podcast);
            },
            err =>
                this.toastService.showError(
                    'Error deleting entry',
                    'Please refresh page and try again'
                )
        );
    }
}
