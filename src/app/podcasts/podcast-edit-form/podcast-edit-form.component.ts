import { PodcastDeleteComponent } from '../podcast-delete.component';
import { map } from 'rxjs/operators';
import { OnInit, Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Podcast, Category } from '../../core';
import { Observable, of } from 'rxjs';
import { PodcastStoreService } from '../podcast-store.service';
import { PodcastDataService } from '../podcast-data.service';
import { UtilityService } from '../../shared/services/utility.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UUID } from 'angular2-uuid';
import { ImageUploadComponent } from '../../shared/components/image-upload/image-upload.component';
import { PodcastAddWizardComponent } from '../podcast-add-wizard/podcast-add-wizard.component';
import { validateSearch } from '../../shared/validators/search.validator';
import { validateDomain } from '../../shared/validators/domain.validator';
// import { ConditionalValidator } from '../../shared/validators/conditional.validator';
import { CategoryService } from '../../shared/services/category.service';
import { AlertService } from '../../core/alerts/alert.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-podcast-edit-form',
    templateUrl: './podcast-edit-form.component.html',
    styleUrls: ['./podcast-edit-form.component.scss']
})
export class PodcastEditFormComponent implements OnInit {
    podcast$: Observable<Podcast>;
    @ViewChild('wizardControl', { static: false })
    wizardControl: PodcastAddWizardComponent;
    useWizard: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private podcastDataService: PodcastDataService,
        private podcastStore: PodcastStoreService,
        private modalService: NgbModal,
        private alertService: AlertService
    ) {}

    ngOnInit() {
        const id = this.route.snapshot.params.podcast;
        this.useWizard = this.route.snapshot.params.useWizard || false;
        if (!this.useWizard) {
            if (!id) {
                this.podcast$ = of(new Podcast());
            } else {
                this.podcastStore.entities$
                    .pipe(map(r => r.filter(it => it.slug === id)))
                    .subscribe(p => {
                        const podcast = p[0];
                        if (podcast) {
                            this.podcast$ = of(podcast);
                        }
                    });
            }
        } else {
            this.podcast$ = of(new Podcast());
        }
    }
    wizardFinish(podcast: Podcast) {
        this.podcastDataService.addPodcast(podcast).subscribe(r => {
            this.alertService.info('Success', 'Successfully added podcast');
            this.router.navigate(['podcasts', r.slug]);
        });
    }
    showPodcastDeleteDialog(podcast: Podcast) {
        const modalRef = this.modalService.open(PodcastDeleteComponent);
        modalRef.componentInstance.podcast = podcast;
        modalRef.result.then(r => {
            if (r === 'delete') {
                this.deletePodcast(podcast);
            }
        });
    }
    deletePodcast(podcast: Podcast) {
        console.log('PodcastComponent', 'deletePodcast');
        this.podcastDataService.deletePodcast(podcast.id).subscribe(
            r => {
                if (r) {
                    if (localStorage.getItem('__spslug') === podcast.slug) {
                        localStorage.removeItem('__spslug');
                    }
                    this.podcastStore.removeOneFromCache(podcast);
                    this.router.navigate(['/']);
                } else {
                    this.alertService.info(
                        'Error',
                        'There was an error deleting podcast.'
                    );
                }
            },
            () =>
                this.alertService.error(
                    'Error',
                    'There was an error deleting podcast.'
                )
        );
    }
    podcastUpdated(podcast: Podcast) {
        this.podcastStore.updateOneInCache(podcast);
    }
}
