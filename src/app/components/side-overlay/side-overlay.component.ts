import { Component, OnInit, Input } from '@angular/core';
import { Profile, PodcastEntry } from '../../core';
import { UiStateService } from '../../core/ui-state.service';
import { EntriesStoreService } from '../../podcasts/entries-store.service';
import { Observable } from 'rxjs';
import { AudioService } from '../../core/audio.service';
import { AlertService } from 'app/core/alerts/alert.service';

@Component({
    selector: 'app-side-overlay',
    templateUrl: './side-overlay.component.html',
    styleUrls: ['./side-overlay.component.scss']
})
export class SideOverlayComponent implements OnInit {
    @Input() profile: Profile;
    entries$: Observable<PodcastEntry[]>;
    loading$: Observable<boolean>;

    constructor(
        public uiStateService: UiStateService,
        public audioService: AudioService,
        public alertService: AlertService,
        private entryService: EntriesStoreService
    ) {
        this.entries$ = entryService.entities$;
        this.loading$ = entryService.loading$;
    }

    ngOnInit() {
        this.entryService.getAll();
    }
    playAudio(entry: PodcastEntry) {
        // this.audioService.playAudio(
        //     entry.audioUrl,
        //     entry.podcastTitle,
        //     entry.title,
        //     entry.imageUrl
        // );
        this.alertService.info('Sorry', 'Not currently implemented');
    }
}
