import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { PodcastModel, PodcastEntryModel } from 'app/models/podcasts.models';
import { ToastyService } from 'ng2-toasty';
import { PodcastService } from 'app/services/podcast.service';
import { AppComponent } from 'app/app.component';
import { Store } from '@ngrx/store';
import { ApplicationState } from 'app/store';
import { HostListener } from '@angular/core';
import { Location } from '@angular/common';

import { UpdateAction, AddAction } from 'app/actions/entries.actions';
import * as fromPodcast from 'app/reducers';
import * as fromPodcastActions from 'app/actions/podcast.actions';
import * as fromEntriesActions from 'app/actions/entries.actions';
import { NgcCookieConsentService } from 'ngx-cookieconsent';
import { BasePageComponent } from '../base-page/base-page.component';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
    selector: 'app-podcast',
    templateUrl: './podcast.component.html',
    styleUrls: ['./podcast.component.css']
})
export class PodcastComponent extends BasePageComponent {
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

    constructor(
        private _store: Store<ApplicationState>,
        private _service: PodcastService,
        private _toasty: ToastyService,
        private _cookieConsentService: NgcCookieConsentService,
        private _location: Location,
        private _route: ActivatedRoute,
        public modalService: NgxSmartModalService
    ) {
        super();
        this.selectedPodcast$ = _store.select(fromPodcast.getSelectedPodcast);

        this.entries$ = _store.select(fromPodcast.getEntries);
        _route.params.subscribe((params) => {
            let slug = params['slug'];
            if (slug !== undefined) {
                this.firstRun = false;
                _store.dispatch(new fromEntriesActions.LoadAction(slug));
                _store.dispatch(new fromPodcastActions.SelectAction(slug));
            } else {
                this.selectedPodcast$.subscribe((r) => {
                    if (r) {
                        slug = r.slug;
                        _store.dispatch(
                            new fromEntriesActions.LoadAction(slug)
                        );
                        _store.dispatch(
                            new fromPodcastActions.SelectAction(slug)
                        );

                        this._location.go('/podcasts/' + slug);
                    }
                });
                console.log('podcast.component.ts', 'ctor', params);
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
        this._store.dispatch(new fromEntriesActions.AddSuccessAction(entry));
    }

    processPlaylist(entry: PodcastEntryModel) {
        this.urlMode = false;
        this.uploadMode = false;
        this._service.addPlaylist(entry).subscribe((e) => {
            if (e) {
                this._toasty.info(
                    'Playlist added, check back here (and on your device) for new episodes'
                );
            }
        });
    }
}
