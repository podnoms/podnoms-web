import { map } from 'rxjs/operators';
import { OnInit, AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Podcast, Category } from '../../core';
import { Observable, of } from 'rxjs';
import { PodcastStoreService } from '../podcast-store.service';
import { PodcastDataService } from '../podcast-data.service';
import { Actions } from '@ngrx/effects';
import { UtilityService } from '../../shared/services/utility.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UUID } from 'angular2-uuid';
import { ImageUploadComponent } from '../../shared/components/image-upload/image-upload.component';
import { PodcastAddWizardComponent } from '../podcast-add-wizard/podcast-add-wizard.component';
import { validateSearch } from '../../shared/validators/search.validator';
import { validateDomain } from '../../shared/validators/domain.validator';
// import { ConditionalValidator } from '../../shared/validators/conditional.validator';
import { NotificationsService } from 'angular2-notifications';

@Component({
    selector: 'app-podcast-edit-form',
    templateUrl: './podcast-edit-form.component.html',
    styleUrls: ['./podcast-edit-form.component.scss']
})
export class PodcastEditFormComponent implements OnInit {
    podcast$: Observable<Podcast>;
    formImageUrl: string;
    public category: string;
    public subcategories: Array<string>;

    podcastForm: FormGroup;
    @ViewChild('imageControl')
    imageControl: ImageUploadComponent;
    @ViewChild('wizardControl')
    wizardControl: PodcastAddWizardComponent;

    useWizard: boolean = false;
    sending = false;
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
            'html'
        ],
        height: 300
    };
    constructor(
        private route: ActivatedRoute,
        private utilityService: UtilityService,
        private podcastStore: PodcastStoreService,
        private podcastDataService: PodcastDataService,
        private router: Router,
        private fb: FormBuilder,
        private notifier: NotificationsService
    ) {}
    _createForm(fb: FormBuilder, podcast: Podcast): FormGroup {
        const form = fb.group({
            id: [podcast.id],
            title: [podcast.title, Validators.required],
            slug: [
                podcast.slug,
                Validators.compose([
                    // Validators.required,
                    // Validators.minLength(5),
                    Validators.maxLength(30)
                ]),
                Validators.composeAsync([validateSearch(this.utilityService, 'Podcasts', 'Slug', podcast.slug)])
            ],
            customDomain: [
                podcast.customDomain,
                Validators.compose([]),
                Validators.composeAsync([validateDomain(this.utilityService)])
            ],
            description: [podcast.description]
        });
        return form;
    }
    ngOnInit() {
        const id = this.route.snapshot.params.podcast;

        this.useWizard = this.route.snapshot.params.useWizard || false;
        if (!id) {
            const podcast = new Podcast();
            this.utilityService.getTemporaryPodcastImageUrl().subscribe(
                u => {
                    this.formImageUrl = u;
                    this.podcast$ = of(podcast);
                },
                () => (this.podcast$ = of(podcast))
            );
            this.podcastForm = this._createForm(this.fb, podcast);
        } else {
            this.podcastStore.entities$.pipe(map(r => r.filter(it => it.slug === id))).subscribe(p => {
                const podcast = p[0];
                if (podcast) {
                    if (podcast.category) {
                        this.category = podcast.category.id;
                    }
                    this.formImageUrl = podcast.imageUrl;
                    this.podcast$ = of(podcast);
                    this.podcastForm = this._createForm(this.fb, podcast);
                }
            });
        }
    }
    wizardFinish(podcast: Podcast) {
        this._updatePodcast(podcast);
    }
    submitForm() {
        const podcast: Podcast = Object.assign({}, this.podcastForm.value);
        this._updatePodcast(podcast);
    }
    private _updatePodcast(podcast: Podcast) {
        console.log('podcast-edit-form.component', 'category', this.category);
        console.log('podcast-edit-form.component', 'subcategories', this.subcategories);

        if (this.category) {
            podcast.category = new Category(this.category);
        }
        // TODO: Fix this.
        // podcast.subcategories = this.subcategories;

        this.sending = true;
        const activeImageControl = this.imageControl || this.wizardControl.getImageControl();
        if (!podcast.id) {
            podcast.imageUrl = this.formImageUrl;
            this.podcastDataService.addPodcast(podcast).subscribe(p => {
                activeImageControl.commitImage(p.id, 'podcast').subscribe(r => {
                    this.podcastStore.addOneToCache(p);
                    this.podcastStore.updateOneInCache(p);
                    this.router.navigate(['podcasts', p.slug]);
                });
            });
        } else {
            this.podcastDataService.updatePodcast(podcast).subscribe(p => {
                activeImageControl.commitImage(p.id, 'podcast').subscribe(r => {
                    // nasty dance to force refresh of thumbnails
                    p.thumbnailUrl = `${r || p.imageUrl}?v=${UUID.UUID()}`;
                    this.podcastStore.updateOneInCache(p);
                    this.router.navigate(['podcasts', p.slug]);
                });
            });
        }
    }
    deletePodcast(podcast: Podcast) {
        console.log('PodcastComponent', 'deletePodcast');
        this.podcastDataService.deletePodcast(podcast.id).subscribe(
            r => {
                if (r) {
                    this.podcastStore.removeOneFromCache(podcast);
                    this.router.navigate(['/']);
                } else {
                    this.notifier.error('Error', 'There was an error deleting podcast.');
                }
            },
            err =>
                this.notifier.error('Error', 'There was an error deleting podcast.', {
                    timeOut: 3000,
                    showProgressBar: true,
                    pauseOnHover: true,
                    clickToClose: true
                })
        );
    }
    podcastUpdated(podcast: Podcast) {
        this.podcastStore.updateOneInCache(podcast);
    }
}
