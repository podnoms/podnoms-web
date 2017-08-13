import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, NgZone } from '@angular/core';
import { Location } from '@angular/common';
import { PodcastService } from '../../services/podcast.service';
import { PodcastModel, PodcastEntryModel } from '../../models/podcasts.models';
import { ToastyService } from 'ng2-toasty';
import { PusherService } from '../../services/pusher.service';
import { AppComponent } from '../../app.component';

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

    isLoading = true;
    uploadMode = false;

    constructor(private _rootComp: AppComponent, private _route: ActivatedRoute, private _location: Location, private zone: NgZone,
                private _podcastService: PodcastService, private _toastyService: ToastyService) {
        this._rootComp.cssClass = 'app header-fixed aside-menu-fixed aside-menu-hidden';
    }

    ngOnInit() {
        // this._route.params.subscribe(p => {
        //     this._getPodcasts(p['slug']);
        // });
    }

    _getPodcasts(slug: String) {
        //this._podcastService.getPodcasts().subscribe(podcasts => {
        // this._podcastService.podcasts.subscribe(podcasts => {
        //     this.podcasts = podcasts;
        //     if (this.podcasts.length != 0) {
        //         if (slug == null) {
        //             this.selectedPodcast = this.podcasts[0];
        //         } else {
        //             this.selectedPodcast = this.podcasts.find(e => e.slug === slug)
        //         }
        //         this.selectedPodcastId = this.selectedPodcast.id;
        //         this.onPodcastChange();
        //     } else {
        //         this.isLoading = false;
        //     }
        // });
    }

    onPodcastChange() {
        console.log('PodcastComponent', 'onPodcastChange', this.selectedPodcastId);
        this.selectedPodcast = this.podcasts.find(p => p.id == this.selectedPodcastId);
        this.entries = this.selectedPodcast ? this.selectedPodcast.podcastEntries : null;
        this.isLoading = false;
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
        const index = this.selectedPodcast.podcastEntries.indexOf(entry);
        if (index === -1) {
            return;
        }
        this.selectedPodcast.podcastEntries.splice(index, 1);
    }

    onEntryUploadComplete($event) {
        let entry = new PodcastEntryModel();
        entry = $event[1];
        this.uploadMode = false;
        this._processEntryCallback(entry);
    }

    _processEntryCallback(entry: PodcastEntryModel) {
        this.zone.run(() => {
            this.entries.push(entry);
            this.newEntrySourceUrl = '';
        });
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

    startUpload() {
        this.uploadMode = !this.uploadMode;
    }
}
