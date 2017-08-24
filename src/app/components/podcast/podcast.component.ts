import {ActivatedRoute} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {PodcastService} from '../../services/podcast.service';
import {PodcastModel, PodcastEntryModel} from '../../models/podcasts.models';
import {ToastyService} from 'ng2-toasty';
import {AppComponent} from '../../app.component';
import {Store} from "@ngrx/store";
import {AppStore} from "../../models/app.store";

@Component({
    selector: 'app-podcast',
    templateUrl: './podcast.component.html',
    styleUrls: ['./podcast.component.css']
})
export class PodcastComponent implements OnInit {

    podcasts: PodcastModel[];
    selectedPodcast: PodcastModel;
    selectedPodcastId: number;
    newEntrySourceUrl: string;


    uploadMode = false;

    constructor(private _rootComp: AppComponent,
                private _store: Store<AppStore>,
                private _route: ActivatedRoute,
                private _podcastService: PodcastService,
                private _toastyService: ToastyService) {
        this._rootComp.cssClass = 'app header-fixed aside-menu-fixed aside-menu-hidden';
        _store.select('selectedPodcast')
            .subscribe(p => {
                console.log('PodcastComponent', 'selectedPodcast', p);
                this.selectedPodcast = p;
            });
    }

    ngOnInit() {
        this._route.params.subscribe(p => {
             p = this._store.dispatch({t})
        });
    }

    onPodcastChange() {
        console.log('PodcastComponent', 'onPodcastChange', this.selectedPodcastId);
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
