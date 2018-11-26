import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { Podcast, PodcastEntry, ToastService } from '../../core';
import { PodcastStoreService } from '../podcast-store.service';
import { PodcastDataService } from '../podcast-data.service';
import { trigger, transition, style, sequence, animate } from '@angular/animations';

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
export class PodcastDetailComponent {
    @Input() podcast: Podcast;

    constructor(
        private podcastStore: PodcastStoreService,
        private podcastDataService: PodcastDataService,
        private toastService: ToastService
    ) {}

    deleteEntry(entry: PodcastEntry) {
        this.podcastDataService.deleteEntry(entry.id).subscribe(
            () => {
                this.podcast.podcastEntries = this.podcast.podcastEntries.filter(( obj ) => obj.id !== entry.id);
                this.podcastStore.updateOneInCache(this.podcast);
            },
            () =>
                this.toastService.showError(
                    'Error deleting entry',
                    'Please refresh page and try again'
                )
        );
    }
}
