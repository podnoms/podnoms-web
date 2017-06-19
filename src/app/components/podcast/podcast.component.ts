import {Component, OnInit} from '@angular/core';
import {PodcastsService} from '../../services/podcasts.service';
import {PodcastEntryModel, PodcastModel} from '../../models/podcasts.models';
import {ToastyService} from 'ng2-toasty';
import {PusherService} from '../../services/pusher.service';

@Component({
    selector: 'app-podcast',
    templateUrl: './podcast.component.html',
    styleUrls: ['./podcast.component.css']
})
export class PodcastComponent implements OnInit {

    podcasts: PodcastModel[];
    entries: PodcastEntryModel[];
    selectedPodcast: PodcastModel;
    selectedPodcastId: number;
    newEntrySourceUrl: string;
    rssUrl: string;

    constructor(private _podcastService: PodcastsService,
                private _toastyService: ToastyService) {
    }

    ngOnInit() {
        this._getPodcasts();
    }

    _getPodcasts() {
        this._podcastService.getPodcasts().subscribe(podcasts => {
            this.podcasts = podcasts;
            if (this.podcasts.length != 0) {
                this.selectedPodcast = this.podcasts[0];
                this.selectedPodcastId = this.selectedPodcast.id;
                this.onPodcastChange();
            }
        });
    }

    onPodcastChange() {
        console.log('PodcastComponent', 'onPodcastChange', this.selectedPodcastId);
        this.selectedPodcast = this.podcasts.find(p => p.id == this.selectedPodcastId);
        this.entries = this.selectedPodcast ? this.selectedPodcast.podcastEntries : null;

        this._podcastService.getPodcastRssUrl(this.selectedPodcast.slug)
            .subscribe(result => {
                this.rssUrl = result.url;
            });
    }

    addPodcast() {

    }

    addEntry() {
        const model = new PodcastEntryModel(this.selectedPodcast.id, this.newEntrySourceUrl);
        this._podcastService.addPodcastEntry(model)
            .subscribe(
                (entry) => this._processEntryCallback(entry),
                (error) => this._processEntryErrorCallback(error)
            );
    }

    _processEntryCallback(entry: PodcastEntryModel) {
        this.entries.push(entry);
        console.log('PodcastEntryAddFormComponent: podcast entry added successfully', entry);
        if (entry.processingStatus !== 'Processing') {
            this._toastyService.warning({
                title: 'Warning',
                msg: 'Podcast added successfully but unable to currently start processing. Check back again later.',
                theme: 'bootstrap',
                showClose: true,
                timeout: 5000
            });
        }
        console.log('PodcastComponent', '_processEntryCallback', entry);
    }

    _processEntryErrorCallback(error) {
        this._toastyService.error({
            title: 'Error',
            msg: 'Error adding entry.\n' + error,
            theme: 'bootstrap',
            showClose: true,
            timeout: 5000
        });
    }
}
