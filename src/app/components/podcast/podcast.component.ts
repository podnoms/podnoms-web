import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { PodcastsService } from '../../services/podcasts.service';
import { PodcastModel, PodcastEntryModel } from '../../models/podcasts.models';
import { ToastyService } from 'ng2-toasty';
import { PusherService } from '../../services/pusher.service';

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
    isLoading = true;
    constructor(private _route: ActivatedRoute, private _location: Location,
        private _podcastService: PodcastsService, private _toastyService: ToastyService) {
    }

    ngOnInit() {
        this._route.fragment.subscribe((fragment: string) => {
            console.log('My hash fragment is here => ', fragment)
            this._getPodcasts(fragment);
        });
    }

    _getPodcasts(slug: String) {
        this._podcastService.getPodcasts().subscribe(podcasts => {
            this.podcasts = podcasts;
            if (this.podcasts.length != 0) {
                if (slug == null) {
                    this.selectedPodcast = this.podcasts[0];
                } else {
                    this.selectedPodcast = this.podcasts.find(e => e.slug === slug)
                }
                this.selectedPodcastId = this.selectedPodcast.id;
                this.onPodcastChange();
            } else {
                this.isLoading = false;
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
        this._location.replaceState(`/podcasts#${this.selectedPodcast.slug}`);
        this.isLoading = false;
    }


    deletePodcast() {
        if (this.selectedPodcast.id) {
            this._podcastService.deletePodcast(this.selectedPodcast.id)
                .subscribe(r => {
                    console.log('PodcastComponent', 'deletePodcast', r);
                    this._getPodcasts(null);
                });
        }
    }

    addEntry() {
        const model = new PodcastEntryModel(this.selectedPodcast.id, this.newEntrySourceUrl);
        this._podcastService.addPodcastEntry(model)
            .subscribe(
            (entry) => this._processEntryCallback(entry),
            (error) => this._processEntryErrorCallback(error)
            );
    }

    deleteEntry(entry: PodcastEntryModel) {
        console.log(entry);
        console.log('PodcastComponent', 'deleteEntry', entry);
        // this.selectedPodcast.podcastEntries = this.selectedPodcast.podcastEntries.filter(obj => obj.id !== entry.id);

        const index = this.selectedPodcast.podcastEntries.indexOf(entry);
        if (index === -1) {
            return;
        }
        this.selectedPodcast.podcastEntries.splice(index, 1);
    }

    _processEntryCallback(entry: PodcastEntryModel) {
        this.entries.push(entry);
        this.newEntrySourceUrl = '';
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
