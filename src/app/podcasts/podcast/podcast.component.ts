import { UiStateService } from './../../core/ui-state.service';
import { map, skip, takeUntil, first, tap } from 'rxjs/operators';
import {
    Component,
    ChangeDetectorRef,
    OnDestroy,
    HostListener,
    ViewChild
} from '@angular/core';
import { Podcast } from '../../core';
import { PodcastStoreService } from '../podcast-store.service';
import { BehaviorSubject, Observable, Subject, timer } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { UploadModes } from '../upload-modes.enum';
import { PodcastDataService } from '../podcast-data.service';
import { AlertService } from '../../core/alerts/alert.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PodcastDeleteComponent } from '../podcast-delete.component';
import { PodcastDetailComponent } from '../podcast-detail/podcast-detail.component';

@Component({
    selector: 'app-podcast',
    templateUrl: './podcast.component.html',
    styleUrls: ['./podcast.component.scss']
})
export class PodcastComponent implements OnDestroy {
    uploadModes = UploadModes; // do this so it can be used in the template
    uploadMode: UploadModes = UploadModes.none; // do this so it can be used in the template
    loading$: Observable<boolean>;
    noPodcasts: boolean = true;
    podcast$: Observable<Podcast>;

    @ViewChild('podcastDetail', { static: false })
    podcastDetailComponent: PodcastDetailComponent;

    mode: UploadModes = UploadModes.fromUrl;
    id: any;
    private onComponentDestroy$: Subject<void>;

    constructor(
        private podcastStoreService: PodcastStoreService,
        private podcastDataService: PodcastDataService,
        private router: Router,
        private route: ActivatedRoute,
        private modalService: NgbModal,
        private alertService: AlertService,
        private changeDetectorRef: ChangeDetectorRef
    ) {
        this.onComponentDestroy$ = new Subject();
        this._initialiseState(this.route.snapshot.params.podcast);
    }
    ngOnDestroy() {
        this.onComponentDestroy$.next();
    }
    _initialiseState(id: string) {
        this.id = id;
        this.podcast$ = this.podcastStoreService.getByKey(id);
        this.loading$ = this.podcastStoreService.loading$;
    }
    copyUrl(url: string) {
        const el = document.createElement('textarea');
        el.value = url;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        this.alertService.success('Success', 'URL Copied to clipboard');
    }
    startUpload(uploadMode: UploadModes) {
        this.uploadMode = uploadMode;
    }
    podcastUpdated(podcast: Podcast) {
        // this is a little funky but it works..
        this.podcastDetailComponent.detectChanges();
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
                    this.podcastStoreService.removeOneFromCache(podcast);
                    this.router.navigate(['/']);
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
