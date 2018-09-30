import { Component, OnInit, Input } from '@angular/core';
import { Podcast, ToastService, Category } from '../../core';
import { PodcastDataService } from '../podcast-data.service';

@Component({
    selector: 'app-podcast-privacy',
    templateUrl: './podcast-privacy.component.html',
    styleUrls: ['./podcast-privacy.component.scss']
})
export class PodcastPrivacyComponent implements OnInit {
    @Input()
    podcast: Podcast;

    constructor(
        private podcastDataService: PodcastDataService,
        private toastService: ToastService
    ) {}

    ngOnInit() {}

    updatePrivacySettings() {
        // me:  messy, should ngrx this stuff
        // also me: Code like no one is watching!!!

        // TODO: hack here as we (correctly) cannot send null category
        this.podcast.category = this.podcast.category || null;
        this.podcastDataService
            .updatePodcast(this.podcast)
            .subscribe(r => this.toastService.showToast('Success', 'Updated privacy settings'));
        return false;
    }
}
