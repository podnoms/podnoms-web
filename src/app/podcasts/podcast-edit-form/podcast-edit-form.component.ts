import { PodcastDeleteComponent } from '../podcast-delete.component';
import { map } from 'rxjs/operators';
import { OnInit, Component, ViewChild, AfterViewChecked } from '@angular/core';
import { Podcast } from '../../core';
import { Observable, of } from 'rxjs';
import { PodcastStoreService } from '../podcast-store.service';
import { PodcastDataService } from '../podcast-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PodcastAddWizardComponent } from '../podcast-add-wizard/podcast-add-wizard.component';
// import { ConditionalValidator } from '../../shared/validators/conditional.validator';
import { AlertService } from '../../core/alerts/alert.service';
import {
    NgbModal,
    NgbNav,
    NgbNavChangeEvent,
} from '@ng-bootstrap/ng-bootstrap';
import { NGXLogger } from 'ngx-logger';

@Component({
    selector: 'app-podcast-edit-form',
    templateUrl: './podcast-edit-form.component.html',
    styleUrls: ['./podcast-edit-form.component.scss'],
})
export class PodcastEditFormComponent implements OnInit, AfterViewChecked {
    podcast$: Observable<Podcast>;
    @ViewChild('wizardControl')
    wizardControl: PodcastAddWizardComponent;
    useWizard: boolean = false;
    public activeTab: string = 'details';
    private redirectOnSave: boolean = false;

    @ViewChild('details') details: any;
    @ViewChild('public') public: any;
    @ViewChild('notifications') notifications: any;
    @ViewChild('nerds') nerds: any;
    public tabControls = {};

    @ViewChild('nav') nav: NgbNav;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private podcastDataService: PodcastDataService,
        private podcastStore: PodcastStoreService,
        private modalService: NgbModal,
        private alertService: AlertService,
        private logger: NGXLogger
    ) {}

    ngOnInit() {
        const id = this.route.snapshot.params.podcast;
        this.useWizard = this.route.snapshot.params.useWizard || false;
        if (!this.useWizard) {
            if (!id) {
                this.podcast$ = of(new Podcast());
                this.redirectOnSave = true;
            } else {
                this.podcastStore.entities$
                    .pipe(map((r) => r.filter((it) => it.slug === id)))
                    .subscribe((p) => {
                        const podcast = p[0];
                        if (podcast) {
                            this.podcast$ = of(podcast);
                        }
                    });
            }
        } else {
            this.podcast$ = of(new Podcast());
            this.redirectOnSave = true;
        }
    }
    ngAfterViewChecked() {
        this.tabControls = {
            details: this.details,
            public: this.public,
            notifications: this.notifications,
            nerds: this.nerds,
        };
    }
    wizardFinish(podcast: Podcast) {
        this.podcastDataService.addPodcast(podcast).subscribe((p) => {
            this.wizardControl.imageControl
                .commitImage(p.id, 'podcast')
                .subscribe(() => {
                    this.podcastStore.addOneToCache(p);
                    this.podcastStore.updateOneInCache(p);
                    this.alertService.info(
                        'Success',
                        'Successfully added podcast'
                    );
                    this.router.navigate(['podcasts', p.slug]);
                });
        });
    }
    onNavChange(changeEvent: NgbNavChangeEvent) {
        const currentTab = this.tabControls[this.activeTab];
        if (currentTab && typeof currentTab.formStatus === 'function') {
            const status = currentTab.formStatus();
            if (!status.isValid) {
                changeEvent.preventDefault();
                this.alertService.warn(
                    'Warning',
                    'There are errors on this page, please correct before moving tabs'
                );
            } else if (status.hasChanges) {
                changeEvent.preventDefault();
                this.alertService.warn(
                    'Warning',
                    'The current tab has unsaved changes, please press the Save Changes button before moving tabs'
                );
            }
        }
    }
    sendSaveEvent() {
        const currentTab = this.tabControls[this.activeTab];
        if (currentTab && typeof currentTab.parentSaveHandler === 'function') {
            currentTab.parentSaveHandler().subscribe((podcast: Podcast) => {
                if (podcast && podcast.slug) {
                    if (this.redirectOnSave) {
                        this.alertService.info(
                            'Success',
                            'Podcast created successfully'
                        );
                        this.router.navigate(['podcasts', podcast.slug]);
                    } else {
                        this.alertService.info(
                            'Success',
                            'Podcast updated successfully'
                        );
                    }
                } else {
                    this.alertService.error(
                        'Error',
                        'Something went wrong saving the form, please check all your values'
                    );
                }
            });
        }
    }
    showPodcastDeleteDialog(podcast: Podcast) {
        const modalRef = this.modalService.open(PodcastDeleteComponent);
        modalRef.componentInstance.podcast = podcast;
        modalRef.result.then((r) => {
            if (r === 'delete') {
                this.deletePodcast(podcast);
            }
        });
    }
    deletePodcast(podcast: Podcast) {
        this.logger.debug('PodcastComponent', 'deletePodcast');
        this.podcastDataService.deletePodcast(podcast.id).subscribe(
            (r) => {
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
