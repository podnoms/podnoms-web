import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EntriesStoreService } from '../entries-store.service';
import { PodcastEntry, ToastService } from '../../core';
import { PodcastDataService } from '../podcast-data.service';
import { ImageUploadComponent } from '../../shared/components/image-upload/image-upload.component';
import { UUID } from 'angular2-uuid';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
    selector: 'app-entry-edit-form',
    templateUrl: './entry-edit-form.component.html',
    styleUrls: ['./entry-edit-form.component.scss']
})
export class EntryEditFormComponent implements OnInit {
    @ViewChild('imageControl')
    imageControl: ImageUploadComponent;

    entryId: string;
    entryEditForm: FormGroup;
    entry: PodcastEntry;
    formImageUrl: string;
    sending: boolean = false;
    constructor(
        route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,
        private entriesStore: EntriesStoreService,
        private entryDataService: PodcastDataService,
        private toastService: ToastService
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
        this.entriesStore.getByKey(this.entryId).subscribe(e => {
            console.log('entry-edit-form.component', 'subscribe', e);
            this.entry = e;
            this.entryEditForm = this._createForm(this.fb, e);
            this.formImageUrl = e.imageUrl;
        });
    }
    submitForm() {
        const entry: PodcastEntry = Object.assign(this.entry, this.entryEditForm.value);
        this.entryDataService.updateEntry(entry).subscribe(e => {
            this.imageControl.commitImage(e.id, 'entry').subscribe(result => {
                if (result !== null) {
                    e = result;
                }
                // nasty dance to force refresh of thumbnails
                e.imageUrl = `${e.imageUrl}?v=${UUID.UUID()}`;
                e.thumbnailUrl = `${e.thumbnailUrl}?v=${UUID.UUID()}`;
                this.entriesStore.updateOneInCache(e);
                this.formImageUrl = e.imageUrl;

                this.toastService.showInfo('Success', 'Entry updated');
                this.router.navigate(['podcasts', e.podcastSlug]);
            });
        });
    }
}
