import { Observable } from 'rxjs/Observable';
import { ActivatedRoute} from '@angular/router';
import { Component } from '@angular/core';
import { PodcastModel, PodcastEntryModel } from 'app/models/podcasts.models';
import { ToastyService } from 'ng2-toasty';
import { AppComponent } from 'app/app.component';
import { Store } from '@ngrx/store';
import { ApplicationState } from 'app/store';


import * as fromPodcast from 'app/reducers';
import * as fromPodcastActions from 'app/actions/podcast.actions';
import * as fromEntriesActions from 'app/actions/entries.actions';

@Component({
    selector: 'app-podcast',
    templateUrl: './podcast.component.html',
    styleUrls: ['./podcast.component.css']
})
export class PodcastComponent  {
    selectedPodcast$: Observable<PodcastModel>;
    entries$: Observable<PodcastEntryModel[]>;
    newEntrySourceUrl: string;
    uploadMode = false;

    constructor(
        private _rootComp: AppComponent,
        private _store: Store<ApplicationState>,
        router: ActivatedRoute,
        private _toastyService: ToastyService) {
        this._rootComp.cssClass = 'app header-fixed aside-menu-fixed aside-menu-hidden';

        this.selectedPodcast$ = _store.select(fromPodcast.getSelectedPodcast);
        this.entries$ = _store.select(fromPodcast.getEntries);

        router.params.subscribe(params => {
            // _store.dispatch(new fromPodcastActions.GetPodcastAction(params['slug']));
            _store.dispatch(new fromEntriesActions.LoadAction(params['slug']));
        });
    }
    addEntry(podcast) {
        const model = new PodcastEntryModel(podcast.id, this.newEntrySourceUrl);
        this._store.dispatch(new fromEntriesActions.AddAction({
            podcastId: podcast.id, sourceUrl: this.newEntrySourceUrl
        }));
    }
    deletePodcast() {
        console.log('PodcastComponent', 'deletePodcast');
    }
    deleteEntry(entry: PodcastEntryModel) {
        this._store.dispatch(new fromEntriesActions.DeleteAction(entry.id));
    }
    startUpload() {
        this.uploadMode = !this.uploadMode;
    }
}
