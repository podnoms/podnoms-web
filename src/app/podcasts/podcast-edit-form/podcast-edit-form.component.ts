import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Podcast } from '../../core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilityService } from '../../shared/services/utility.service';
import { PodcastStoreService } from '../podcast-store.service';
import { PodcastDataService } from '../podcast-data.service';
import { map, filter } from 'rxjs/operators';
import { EntityOp, EntityAction, ofEntityOp } from 'ngrx-data';
import { Actions } from '@ngrx/effects';
import { ImageUploadComponent } from '../../shared/components/image-upload/image-upload.component';
import { PodcastAddWizardComponent } from '../podcast-add-wizard/podcast-add-wizard.component';
import { UUID } from 'angular2-uuid';
@Component({
    selector: 'app-podcast-edit-form',
    templateUrl: './podcast-edit-form.component.html',
    styleUrls: ['./podcast-edit-form.component.scss']
})
export class PodcastEditFormComponent implements OnInit, AfterViewInit {
    @ViewChild('podcastName') podcastNameElement: ElementRef;
    @ViewChild('imageControl') imageControl: ImageUploadComponent;
    @ViewChild('wizardControl') wizardControl: PodcastAddWizardComponent;

    useWizard: boolean = false;

    checkingDomain: boolean = false;
    domainValid: boolean = false;
    loading: boolean = false;
    podcast$: Observable<Podcast>;

    sending = false;
    options = {
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
        private router: Router,
        private utilityService: UtilityService,
        private podcastStoreService: PodcastStoreService,
        private podcastDataService: PodcastDataService,
        private actions$: Actions
    ) {
        console.log('podcast-edit-form', 'constructor');
        // super();
        // this._createEntitySavedObserver();
    }
    _createEntitySavedObserver(): any {
        this.actions$
            .pipe(
                ofEntityOp(),
                filter(
                    (ea: EntityAction) =>
                        ea.entityName === 'Podcast' && ea.op === EntityOp.SAVE_ADD_ONE_SUCCESS
                )
            )
            .subscribe(r => {
                if (r.type === 'SUCCESS') {
                    this.router.navigate(['podcasts', r.payload.slug]);
                }
            });
    }
    ngOnInit() {
        console.log('ngOnInit');
        const id = this.route.snapshot.params.podcast;
        this.useWizard = this.route.snapshot.params.useWizard || false;
        if (!id) {
            const podcast = new Podcast();
            this.utilityService.getTemporaryPodcastImageUrl().subscribe(u => {
                podcast.imageUrl = u;
                this.podcast$ = of(podcast);
            }, () => (this.podcast$ = of(podcast)));
        } else {
            this.podcastStoreService.entities$
                .pipe(map(r => r.filter(it => it.slug === id)))
                .subscribe(p => {
                    const podcast = p[0];
                    if (podcast) {
                        this.podcast$ = of(podcast);
                    }
                });
        }
    }
    ngAfterViewInit() {
        if (!this.useWizard && this.podcastNameElement && this.podcastNameElement.nativeElement) {
            this.podcastNameElement.nativeElement.focus();
        }
    }
    deletePodcast(podcast: Podcast) {
        console.log('PodcastComponent', 'deletePodcast');
        this.podcastDataService
            .deleteEntry(podcast.id)
            .subscribe(() => this.podcastStoreService.delete(podcast));
        this.router.navigate(['/']);
    }
    submitForm(podcast: Podcast) {
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
    checkDomain(domain: string) {
        this.checkingDomain = true;
        this.utilityService.checkDomain(domain).subscribe(e => (this.domainValid = e));
    }
    onWizardFinish(podcast: Podcast) {
        this.submitForm(podcast);
    }
}
