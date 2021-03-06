import { takeUntil, pluck, take, catchError } from 'rxjs/operators';
import { Component, OnDestroy, ViewChild, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Podcast } from '../../core';
import { PodcastStoreService } from '../podcast-store.service';
import { Observable, Subject, throwError, EMPTY } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { UploadModes } from '../upload-modes.enum';
import { PodcastDataService } from '../podcast-data.service';
import { AlertService } from '../../core/alerts/alert.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PodcastDeleteComponent } from '../podcast-delete.component';
import { PodcastDetailComponent } from '../podcast-detail/podcast-detail.component';
import { environment } from 'environments/environment';
import { AuthService } from 'app/auth/auth.service';
import { BasePageComponent } from 'app/shared/components/base-page/base-page.component';
import { UiStateService } from 'app/core/ui-state.service';
import { NGXLogger } from 'ngx-logger';
import { DataServiceError } from '@ngrx/data';

@Component({
    selector: 'app-podcast',
    templateUrl: './podcast.component.html',
    styleUrls: ['./podcast.component.scss'],
})
export class PodcastComponent extends BasePageComponent
    implements OnDestroy, OnInit {
    uploadModes = UploadModes; // do this so it can be used in the template
    uploadMode: UploadModes = UploadModes.none; // do this so it can be used in the template
    loading$: Observable<boolean>;
    noPodcasts: boolean = false;
    podcast$: Observable<Podcast>;
    publicPageEnabled: boolean = environment.publicPageEnabled;

    @ViewChild('podcastDetail')
    podcastDetailComponent: PodcastDetailComponent;

    mode: UploadModes = UploadModes.fromUrl;
    private _destroyed$: Subject<any>;

    constructor(
        private podcastStoreService: PodcastStoreService,
        private podcastDataService: PodcastDataService,
        private router: Router,
        private location: Location,
        private route: ActivatedRoute,
        private modalService: NgbModal,
        private alertService: AlertService
    ) {
        super();
    }

    ngOnInit() {
        this._destroyed$ = new Subject();
        if (this.route.snapshot.params.podcast) {
            this._initialiseState(this.route.snapshot.params.podcast);
            this.route.params
                // .pipe(take(1), pluck('podcast'))
                .pipe(takeUntil(this._destroyed$), pluck('podcast'))
                .subscribe((id) => this._initialiseState(id));
        } else {
            this._loadPodcastFromServer();
        }
    }
    _loadPodcastFromServer() {
        this.podcastDataService
            .getActivePodcast()
            .pipe(take(1))
            .subscribe(
                (p) => {
                    if (p) {
                        this.location.replaceState(`/podcasts/${p}`);
                        this._initialiseState(p);
                    } else {
                        this.noPodcasts = true;
                    }
                },
                () => (this.noPodcasts = true)
            );
    }
    ngOnDestroy() {
        this._destroyed$.next();
        this._destroyed$.complete();
    }
    _initialiseState(id: string) {
        // TODO: take this out, weird Chrome/Angular bug
        if (id !== 'undefined') {
            this.logger.debug('podcast.component', '_initialiseState', id);
            this.podcast$ = this.podcastStoreService.getByKey(id).pipe(
                catchError((err: DataServiceError) => {
                    console.log(
                        'podcast.component',
                        'podcastStoreService_error',
                        err
                    );
                    if (err.error.status === 404) {
                        // we're looking for a podcast that doesn't exist.
                        if (id === localStorage.getItem('__spslug')) {
                            // we've stored a podcast slug that no longer exists
                            localStorage.removeItem('__spslug');
                        }
                    }
                    this._loadPodcastFromServer();
                    return EMPTY;
                })
            );
            this.loading$ = this.podcastStoreService.loading$;
            localStorage.setItem('__spslug', id);
        }
    }
    copyUrl(url: string) {
        const el = document.createElement('textarea');
        el.value = url;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        this.alertService.success('Success', 'URL copied to clipboard');
    }
    startUpload(uploadMode: UploadModes) {
        this.uploadMode = uploadMode;
    }
    podcastUpdated() {
        // this is a little funky but it works..
        this.podcastDetailComponent.detectChanges();
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
        this.podcastDataService
            .deletePodcast(podcast.id)
            .pipe(take(1))
            .subscribe(
                (r) => {
                    if (r) {
                        if (localStorage.getItem('__spslug') === podcast.slug) {
                            localStorage.removeItem('__spslug');
                        }
                        this.podcastStoreService.removeOneFromCache(podcast);
                        this.router.navigate(['/podcasts']);
                    } else {
                        this.alertService.error(
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
}
