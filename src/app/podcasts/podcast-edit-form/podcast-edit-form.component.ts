import { map } from 'rxjs/operators';
import { OnInit, AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Podcast } from '../../core';
import { Observable, of } from 'rxjs';
import { PodcastStoreService } from '../podcast-store.service';
import { PodcastDataService } from '../podcast-data.service';
import { Actions } from '@ngrx/effects';
import { UtilityService } from '../../shared/services/utility.service';
import { ActivatedRoute, Router } from '@angular/router';
import { validateSearch } from '../../shared/validators/search-validator';
import { UUID } from 'angular2-uuid';
import { ImageUploadComponent } from '../../shared/components/image-upload/image-upload.component';
import { PodcastAddWizardComponent } from '../podcast-add-wizard/podcast-add-wizard.component';

@Component({
    selector: 'app-podcast-edit-form',
    templateUrl: './podcast-edit-form.component.html',
    styleUrls: ['./podcast-edit-form.component.scss']
})
export class PodcastEditFormComponent implements OnInit, AfterViewInit {
    podcast$: Observable<Podcast>;

    podcastForm: FormGroup;
    @ViewChild('imageControl') imageControl: ImageUploadComponent;
    @ViewChild('wizardControl') wizardControl: PodcastAddWizardComponent;

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
        private podcastStoreService: PodcastStoreService,
        private podcastDataService: PodcastDataService,
        private router: Router,
        private fb: FormBuilder
    ) {
        console.log('podcast-edit-form', 'constructor');
    }
    _createForm(fb: FormBuilder, podcast: Podcast): FormGroup {
        const form = fb.group({
            id: [podcast.id],
            title: [podcast.title, Validators.required],
            slug: [
                podcast.slug,
                Validators.compose([
                    Validators.required,
                    Validators.minLength(5),
                    Validators.maxLength(30)
                ]),
                Validators.composeAsync([
                    validateSearch(this.utilityService, 'Podcasts', 'Slug', podcast.slug)
                ])
            ],
            description: [podcast.description]
        });
        form.valueChanges.subscribe(() => {
            console.log('podcast-edit-form.component', 'form.valueChanges', this.podcastForm);
        });
        return form;
    }
    ngOnInit() {
        console.log('podcast-edit-form.component', 'ngOnInit');
        const id = this.route.snapshot.params.podcast;

        this.useWizard = this.route.snapshot.params.useWizard || false;
        if (!id) {
            const podcast = new Podcast();
            this.utilityService.getTemporaryPodcastImageUrl().subscribe(u => {
                podcast.imageUrl = u;
                this.podcast$ = of(podcast);
            }, () => (this.podcast$ = of(podcast)));
            this.podcastForm = this._createForm(this.fb, podcast);
        } else {
            this.podcastStoreService.entities$
                .pipe(map(r => r.filter(it => it.slug === id)))
                .subscribe(p => {
                    const podcast = p[0];
                    if (podcast) {
                        this.podcast$ = of(podcast);
                        this.podcastForm = this._createForm(this.fb, podcast);
                    }
                });
        }
    }
    ngAfterViewInit() {
        console.log('podcast-edit-form.component', 'ngAfterViewInit');
    }
    updatePodcast() {
        const podcast: Podcast = Object.assign({}, this.podcastForm.value);
        console.log('podcast-edit-form.component', 'updatePodcast', podcast);
        this.sending = true;
        const activeImageControl = this.imageControl || this.wizardControl.getImageControl();
        if (!podcast.id) {
            this.podcastDataService.addPodcast(podcast).subscribe(p => {
                activeImageControl.commitImage(p.id, 'podcast').subscribe(r => {
                    this.podcastStoreService.addOneToCache(p);
                    this.podcastStoreService.updateOneInCache(p);
                    this.router.navigate(['podcasts', p.slug]);
                });
            });
        } else {
            this.podcastDataService.updatePodcast(podcast).subscribe(p => {
                activeImageControl.commitImage(p.id, 'podcast').subscribe(r => {
                    // nasty dance to force refresh of thumbnails
                    p.thumbnailUrl = `${r || p.imageUrl}?v=${UUID.UUID()}`;
                    this.podcastStoreService.updateOneInCache(p);
                    this.router.navigate(['podcasts', p.slug]);
                });
            });
        }
    }
}