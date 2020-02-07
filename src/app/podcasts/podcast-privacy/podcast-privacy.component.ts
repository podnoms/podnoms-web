import { Component, OnInit, Input } from '@angular/core';
import { Podcast, Category } from '../../core';
import { PodcastDataService } from '../podcast-data.service';
import { AlertService } from '../../core/alerts/alert.service';

@Component({
    selector: 'app-podcast-privacy',
    templateUrl: './podcast-privacy.component.html',
    styleUrls: ['./podcast-privacy.component.scss']
})
export class PodcastPrivacyComponent implements OnInit {
    @Input()
    podcast: Podcast;
    sslRequestUri: string = '';

    constructor(
        private podcastDataService: PodcastDataService,
        private alertService: AlertService
    ) {}

    ngOnInit() {
        this.sslRequestUri = `mailto:customdomain@podnoms.com?subject=Custom domain request&body=URL:${this.podcast.pagesUrl}%0D%0APlease leave the above line intact`;
    }

    saveSettings() {
        this.podcast.category = this.podcast.category || null;
        this.podcastDataService
            .updatePodcast(this.podcast)
            .subscribe(r =>
                this.alertService.info('Success', 'Updated podcast settings')
            );
        return false;
    }
}
