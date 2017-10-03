import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PodcastModel, PodcastEntryModel } from '../../models/podcasts.models';
import { ToastyService } from 'ng2-toasty';
import { AppComponent } from '../../app.component';
import { Store } from '@ngrx/store';
import { State } from 'app/reducers';


import * as fromPodcast from './../../actions/podcast.actions';
import * as fromEntries from './../../actions/entries.actions';

@Component({
    selector: 'app-podcast',
    templateUrl: './podcast.component.html',
    styleUrls: ['./podcast.component.css']
})
export class PodcastComponent implements OnInit {
    selectedPodcast: PodcastModel;
    entries$: Observable<PodcastEntryModel[]>;
    newEntrySourceUrl: string;
    uploadMode = false;

    constructor(
        private _rootComp: AppComponent,
        private _store: Store<State>,
        router: ActivatedRoute,
        private _toastyService: ToastyService) {
        this._rootComp.cssClass = 'app header-fixed aside-menu-fixed aside-menu-hidden';

        _store.select(p => p.podcasts.selectedPodcast)
            .subscribe(podcast => {
                if (podcast != null) {
                    this.selectedPodcast = podcast;
                    _store.dispatch(new fromEntries.LoadAction(podcast.slug));
                }
            });
        router.params.subscribe(params => {
            console.log('PodcastComponent', 'router', params['slug']);
            _store.dispatch(new fromPodcast.GetPodcastAction(params['slug']));
        });
    }
    ngOnInit() {

    }
    addEntry() {
        const model = new PodcastEntryModel(this.selectedPodcast.id, this.newEntrySourceUrl);
        this._store.dispatch(new fromEntries.AddAction({
            podcastId: this.selectedPodcast.id, sourceUrl: this.newEntrySourceUrl
        }));
    }
    deletePodcast() {
        console.log('PodcastComponent', 'deletePodcast');
    }
    deleteEntry(entry: PodcastEntryModel) {
        console.log('PodcastComponent', 'deleteEntry', entry);
        this._store.dispatch(new fromEntries.DeleteAction(entry.slug));
    }
    startUpload() {
        this.uploadMode = !this.uploadMode;
    }
}
