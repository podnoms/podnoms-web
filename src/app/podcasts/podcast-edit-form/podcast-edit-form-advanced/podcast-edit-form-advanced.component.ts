import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Podcast } from 'app/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { validateSearch } from 'app/shared/validators/search.validator';
import { validateDomain } from 'app/shared/validators/domain.validator';
import { UtilityService } from 'app/shared/services/utility.service';
import { AlertService } from 'app/core/alerts/alert.service';
import { PodcastDataService } from 'app/podcasts/podcast-data.service';
import { Router } from '@angular/router';
import { PodcastStoreService } from 'app/podcasts/podcast-store.service';

@Component({
    selector: 'app-podcast-edit-form-advanced',
    templateUrl: './podcast-edit-form-advanced.component.html',
    styleUrls: ['./podcast-edit-form-advanced.component.scss']
})
export class PodcastEditFormAdvancedComponent implements AfterViewInit {
    @Input()
    podcast: Podcast;
    podcastForm: FormGroup;

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private utilityService: UtilityService,
        private alertService: AlertService,
        private podcastStore: PodcastStoreService,
        private podcastDataService: PodcastDataService
    ) {}

    ngAfterViewInit() {
        setTimeout(() => {
            this.podcastForm = this._createForm(this.fb, this.podcast);
        });
    }
    submitForm() {
        const podcast: Podcast = Object.assign(
            this.podcast,
            this.podcastForm.value
        );
        this.podcastDataService.updatePodcast(podcast).subscribe(() => {
            this.alertService.info('Success', 'Updated podcast details');
            this.podcastStore.updateOneInCache(podcast);
            this.router.navigate(['podcasts', podcast.slug]);
        });
    }
    _createForm(fb: FormBuilder, podcast: Podcast): FormGroup {
        const form = fb.group({
            id: [podcast.id],
            category: [podcast.category, Validators.required],
            slug: [
                podcast.slug,
                Validators.compose([
                    // Validators.required,
                    // Validators.minLength(5),
                    Validators.maxLength(30)
                ]),
                Validators.composeAsync([
                    validateSearch(
                        this.utilityService,
                        'Podcasts',
                        'Slug',
                        podcast.slug
                    )
                ])
            ],
            customDomain: [
                podcast.customDomain,
                Validators.compose([]),
                Validators.composeAsync([validateDomain(this.utilityService)])
            ]
        });
        return form;
    }
}
