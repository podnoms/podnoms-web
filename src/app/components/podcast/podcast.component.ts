import { DeleteEntryAction, AddEntryAction } from './../../actions/podcast-entries.actions';
import { GetPodcastAction } from './../../actions/podcast.actions';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PodcastModel, PodcastEntryModel } from '../../models/podcasts.models';
import { ToastyService } from 'ng2-toasty';
import { AppComponent } from '../../app.component';
import { Store } from '@ngrx/store';
import { State } from 'app/reducers';

@Component({
    selector: 'app-podcast',
    templateUrl: './podcast.component.html',
    styleUrls: ['./podcast.component.css']
})
export class PodcastComponent implements OnInit {
    selectedPodcast: PodcastModel;
    newEntrySourceUrl: string;
    uploadMode = false;

    constructor(
        private _rootComp: AppComponent,
        private _store: Store<State>,
        router: ActivatedRoute,
        private _toastyService: ToastyService) {
        this._rootComp.cssClass = 'app header-fixed aside-menu-fixed aside-menu-hidden';

        _store.select(p => p.podcasts.selectedPodcast)
            .subscribe(p => this.selectedPodcast = p);

        router.params.subscribe(params => {
            console.log('PodcastComponent', 'router', params['slug']);
            _store.dispatch(new GetPodcastAction(params['slug']));
        });
    }
    ngOnInit() {

    }
    onPodcastChange() {
    }
    addEntry() {
        const model = new PodcastEntryModel(this.selectedPodcast.id, this.newEntrySourceUrl);
        this._store.dispatch(new AddEntryAction({
            podcastId: this.selectedPodcast.id, sourceUrl: this.newEntrySourceUrl
        }));
        /*
        this._podcastService.addPodcastEntry(model);
            .subscribe(
            (entry) => this._processEntryCallback(entry),
            (error) => this._processEntryErrorCallback(error)
            );
        */
    }
    deletePodcast() {
        console.log('PodcastComponent', 'deletePodcast');
    }
    deleteEntry(entry: PodcastEntryModel) {
        console.log('PodcastComponent', 'deleteEntry', entry);
        this._store.dispatch(new DeleteEntryAction(entry.slug));
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
