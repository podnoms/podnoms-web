import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EntriesStoreService } from '../entries-store.service';
import { PodcastEntry } from '../../core';
import { ImageUploadComponent } from '../../shared/components/image-upload/image-upload.component';
import { UUID } from 'angular2-uuid';
import { EntryDataService } from '../entry-data.service';
import { AlertService } from '../../core/alerts/alert.service';
import { NGXLogger } from 'ngx-logger';
import { BasePageComponent } from '../../shared/components/base-page/base-page.component';

@Component({
    selector: 'app-entry-edit-form',
    templateUrl: './entry-edit-form.component.html',
    styleUrls: ['./entry-edit-form.component.scss'],
})
export class EntryEditFormComponent extends BasePageComponent
    implements OnInit {
    @ViewChild('imageControl')
    imageControl: ImageUploadComponent;

    entryId: string;
    entryEditForm: UntypedFormGroup;
    entry: PodcastEntry;
    formImageUrl: string;
    sending: boolean = false;
    constructor(
        route: ActivatedRoute,
        private router: Router,
        private fb: UntypedFormBuilder,
        private entriesStore: EntriesStoreService,
        private entryDataService: EntryDataService,
        private alertService: AlertService
    ) {
        super();
        this.entryId = route.snapshot.params['entry'];
    }
    _createForm(fb: UntypedFormBuilder, entry: PodcastEntry): UntypedFormGroup {
        const form = fb.group({
            id: [entry.id],
            title: [entry.title],
            description: [entry.description],
        });
        return form;
    }

    ngOnInit() {
        this.entriesStore.getByKey(this.entryId).subscribe((e) => {
            this.logger.debug('entry-edit-form.component', 'subscribe', e);
            this.entry = e;
            this.entryEditForm = this._createForm(this.fb, e);
            this.formImageUrl = e.imageUrl;
        });
    }
    submitForm() {
        const entry: PodcastEntry = Object.assign(
            this.entry,
            this.entryEditForm.value
        );
        this.entryDataService.updateEntry(entry).subscribe(
            (e) => {
                if (this.imageControl.imageChanged) {
                    this.imageControl.commitImage(e.id, 'entry').subscribe(
                        (result) => {
                            if (result !== null) {
                                e.imageUrl = `${
                                    result.imageUrl
                                }&v=${UUID.UUID()}}`;
                                e.thumbnailUrl = `${
                                    result.thumbnailUrl
                                }&v=${UUID.UUID()}}`;
                            }

                            this.entriesStore.updateOneInCache(e);
                            this.formImageUrl = e.imageUrl;

                            this.alertService.info('Success', 'Entry updated');
                            this.router.navigate(['podcasts', e.podcastSlug]);
                        },
                        (error) => {
                            this.logger.error(
                                'entry-edit-form.component',
                                'sendImage',
                                error
                            );
                            this.alertService.error(
                                'Error',
                                'There was an error updating the image, please refresh and try again'
                            );
                        }
                    );
                } else {
                    this.alertService.info('Success', 'Entry updated');
                    this.router.navigate(['podcasts', e.podcastSlug]);
                }
            },
            (error) => {
                this.logger.debug(
                    'entry-edit-form.component',
                    'updateEntry',
                    error
                );
                this.alertService.error(
                    'Error',
                    'There was an error updating the entry, please refresh and try again'
                );
            }
        );
    }
}
