import { Component, OnInit } from '@angular/core';
import { UiStateService } from '../../services/ui-state.service';
import { ProfileService } from 'app/services/profile.service';
import { ProfileModel } from 'app/models/profile.model';
import { PodcastEntryModel } from 'app/models/podcasts.models';
import { Observable } from 'rxjs/Observable';
import { PodcastService } from 'app/services/podcast.service';
import { AudioService } from 'app/services/audio.service';

@Component({
    selector: 'app-side-overlay',
    templateUrl: './side-overlay.component.html',
    styleUrls: ['./side-overlay.component.css']
})
export class SideOverlayComponent implements OnInit {
    user$: Observable<ProfileModel>;
    entries$: Observable<PodcastEntryModel[]>;

    constructor(
        private _profileService: ProfileService,
        private _podcastService: PodcastService,
        private _uiStateService: UiStateService,
        private _audioService: AudioService
    ) {}

    ngOnInit() {
        this._uiStateService.overlayChanged.subscribe((r) => {
            if (r) {
                this.user$ = this._profileService.getProfile();
                this.entries$ = this._podcastService.getAllEntriesForUser();
            }
        });
    }
    toggleOverlay() {
        this._uiStateService.toggleOverlay();
    }
    playAudio(entry: PodcastEntryModel) {
        this._audioService.playAudio(entry.audioUrl, entry.title);
    }
}
