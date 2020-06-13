import { Component, Input, ViewChild, AfterViewInit } from '@angular/core';
import { Podcast, Category } from 'app/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ImageUploadComponent } from 'app/shared/components/image-upload/image-upload.component';
import { UtilityService } from 'app/shared/services/utility.service';
import { Observable } from 'rxjs';
import { PodcastStoreService } from 'app/podcasts/podcast-store.service';
import { PodcastDataService } from 'app/podcasts/podcast-data.service';
import { CategoryService } from 'app/shared/services/category.service';
import { AlertService } from 'app/core/alerts/alert.service';
import { UUID } from 'angular2-uuid';
import { environment } from 'environments/environment';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';

@Component({
    selector: 'app-podcast-edit-form-details',
    templateUrl: './podcast-edit-form-details.component.html',
    styleUrls: ['./podcast-edit-form-details.component.scss'],
})
export class PodcastEditFormDetailsComponent implements AfterViewInit {
    @Input()
    podcast: Podcast;
    descriptionOptions = {
        toolbarButtons: [
            'undo',
            'redo',
            '|',
            'bold',
            'italic',
            'underline',
            'strikeThrough',
            'subscript',
            'superscript',
            'outdent',
            'indent',
            'clearFormatting',
            'insertTable',
            'html',
        ],
        height: 300,
    };
    formLoaded: boolean = false;
    podcastForm: FormGroup;
    @ViewChild('imageControl')
    imageControl: ImageUploadComponent;

    public categories$: Observable<Category[]>;
    public environment = environment;
    constructor(
        private router: Router,
        private fb: FormBuilder,
        private podcastDataService: PodcastDataService,
        private podcastStore: PodcastStoreService,
        private alertService: AlertService,
        private logger: NGXLogger,
        categoryService: CategoryService
    ) {
        this.categories$ = categoryService.getCategories();
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.podcastForm = this._createForm(this.fb, this.podcast);
            this.formLoaded = true;
        });
    }
    submitForm() {
        const podcast: Podcast = Object.assign(
            this.podcast,
            this.podcastForm.value
        );
        this._updatePodcast(podcast);
    }
    _createForm(fb: FormBuilder, podcast: Podcast): FormGroup {
        const form = fb.group({
            id: [podcast.id],
            title: [podcast.title, Validators.required],
            category: [podcast.category, Validators.required],
            description: [podcast.description],
        });
        return form;
    }
    private _updatePodcast(podcast: Podcast) {
        // TODO: Fix this.
        // podcast.subcategories = this.subcategories;
        if (!podcast.id) {
            this.podcastDataService.addPodcast(podcast).subscribe(
                (p) => {
                    this.imageControl.commitImage(p.id, 'podcast').subscribe(
                        () => {
                            this.podcastStore.addOneToCache(p);
                            this.podcastStore.updateOneInCache(p);
                            this.alertService.info(
                                'Success',
                                'Successfully added new podcast'
                            );
                            this.router.navigate(['podcasts', p.slug]);
                        },
                        (error) => {
                            this.logger.error(
                                'podcast-edit-form.component',
                                'commitImage',
                                error
                            );
                            this.alertService.error(
                                'Error',
                                'Error updating podcast image'
                            );
                        }
                    );
                },
                () => {
                    this.alertService.error(
                        'Error',
                        'There was an error adding this podcast, please check all your values and try again'
                    );
                }
            );
        } else {
            this.podcastDataService.updatePodcast(podcast).subscribe(
                (p) => {
                    this.imageControl
                        .commitImage(p.id, 'podcast')
                        .subscribe((r) => {
                            // nasty dance to force refresh of thumbnails
                            p.thumbnailUrl = `${
                                r || p.imageUrl
                            }?v=${UUID.UUID()}`;
                            this.podcastStore.updateOneInCache(p);
                            this.alertService.info(
                                'Success',
                                'Updated podcast details'
                            );
                        });
                },
                () => {
                    this.alertService.error(
                        'Error',
                        'There was an error updating this podcast, please check all your values and try again'
                    );
                }
            );
        }
    }
}
