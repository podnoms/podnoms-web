import { UpdateAction, AddAction } from './../../actions/entries.actions';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { PodcastModel, PodcastEntryModel } from 'app/models/podcasts.models';
import { ToastyService } from 'ng2-toasty';
import { AppComponent } from 'app/app.component';
import { Store } from '@ngrx/store';
import { ApplicationState } from 'app/store';
import { HostListener } from '@angular/core';

import * as fromPodcast from 'app/reducers';
import * as fromPodcastActions from 'app/actions/podcast.actions';
import * as fromEntriesActions from 'app/actions/entries.actions';

@Component({
    selector: 'app-podcast',
    templateUrl: './podcast.component.html',
    styleUrls: ['./podcast.component.css']
})
export class PodcastComponent {
    selectedPodcast$: Observable<PodcastModel>;
    entries$: Observable<PodcastEntryModel[]>;
    uploadMode = false;
    urlMode = false;
    firstRun = true;

    @HostListener('document:keyup', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        if (event.key === 'Escape') {
            this.uploadMode = false;
            this.urlMode = false;
        }
    }

    constructor(private _store: Store<ApplicationState>, route: ActivatedRoute) {
        this.selectedPodcast$ = _store.select(fromPodcast.getSelectedPodcast);
        this.entries$ = _store.select(fromPodcast.getEntries);
        route.params.subscribe(params => {
            if (params['slug'] !== undefined) {
                this.firstRun = false;
                _store.dispatch(new fromEntriesActions.LoadAction(params['slug']));
                _store.dispatch(new fromPodcastActions.SelectAction(params['slug']));
            }
        });
    }
    deletePodcast(podcast: PodcastModel) {
        console.log('PodcastComponent', 'deletePodcast');
        this._store.dispatch(new fromPodcastActions.DeleteAction(podcast.id));
    }
    deleteEntry(entry: PodcastEntryModel) {
        this._store.dispatch(new fromEntriesActions.DeleteAction(entry.id));
    }
    startUpload() {
        this.urlMode = false;
        this.uploadMode = !this.uploadMode;
    }
    startAddEntry() {
        this.uploadMode = false;
        this.urlMode = !this.urlMode;
    }
    onEntryUploadComplete(entry: PodcastEntryModel) {
        this.uploadMode = false;
        // entry has already been added on the backend from the upload component
        // so do a funky success/update dance
        this._store.dispatch(new fromEntriesActions.AddSuccessAction(entry));
        this._store.dispatch(new fromEntriesActions.UpdateAction(entry));
    }
    onUrlAddComplete(entry: PodcastEntryModel) {
        this.urlMode = false;
        this._store.dispatch(new fromEntriesActions.AddAction(entry));
    }
}
