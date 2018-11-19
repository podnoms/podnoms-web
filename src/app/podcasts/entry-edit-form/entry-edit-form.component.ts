import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { ActivatedRoute } from '@angular/router';
import { PodcastStoreService } from '../podcast-store.service';
import { EntriesStoreService } from '../entries-store.service';
import { PodcastEntry } from '../../core';
import { Observable } from 'rxjs/internal/Observable';

@Component({
    selector: 'app-entry-edit-form',
    templateUrl: './entry-edit-form.component.html',
    styleUrls: ['./entry-edit-form.component.scss']
})
export class EntryEditFormComponent implements OnInit {
    entryId: string;
    entryEditForm: FormGroup;
    entry$: Observable<PodcastEntry>;
    entry: PodcastEntry;
    formImageUrl: string;

    constructor(
        route: ActivatedRoute,
        private fb: FormBuilder,
        private entriesStore: EntriesStoreService,
        private notifier: NotificationsService
    ) {
        this.entryId = route.snapshot.params['entry'];
    }
    _createForm(fb: FormBuilder, entry: PodcastEntry): FormGroup {
        const form = fb.group({
            id: [entry.id],
            title: [entry.title],
            description: [entry.description]
        });
        return form;
    }

    ngOnInit() {
        this.entry$ = this.entriesStore.getByKey(this.entryId);
        this.entry$.subscribe(e => {
            console.log('entry-edit-form.component', 'subscribe', e);
            this.entryEditForm = this._createForm(this.fb, e);
            this.formImageUrl = e.imageUrl;
        });
    }
    submitForm() {}
}
