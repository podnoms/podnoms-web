import { UiStateService } from './../../core/ui-state.service';
import { map, skip, takeUntil } from 'rxjs/operators';
import {
    Component,
    ChangeDetectorRef,
    OnDestroy,
    HostListener
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

@Component({
    selector: 'app-podcast',
    templateUrl: './podcast.component.html',
    styleUrls: ['./podcast.component.scss']
})
export class PodcastComponent implements OnDestroy {
    uploadModes = UploadModes; // do this so it can be used in the template
    uploadMode: UploadModes = UploadModes.none; // do this so it can be used in the template
    loading: boolean = true;
    noPodcasts: boolean = true;
    podcasts$: Observable<Podcast[]>;
    selectedPodcast$: BehaviorSubject<Podcast> = new BehaviorSubject<Podcast>(
        null
    );
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
        console.log('podcast.component', 'constructor');
        this.onComponentDestroy$ = new Subject();
        if (this.route.snapshot.params.podcast) {
            this._initialiseState(this.route.snapshot.params.podcast); // reset and set based on new parameter this time
        } else {
            this.loading = true;
            // const listenSub = this.podcastStoreService.entities$.pipe(skip(1));
            const selectedPodcast = localStorage.getItem('__spslug') || '';
            if (!selectedPodcast) {
                this.podcastDataService.getActivePodcast().subscribe(
                    r => {
                        if (r) {
                            // here lies the problem: r[0] is meaningless!!
                            this.router.navigate(['podcasts', r]);
                        } else {
                            this.noPodcasts = true;
                            this.loading = false;
                        }
                    },
                    error =>
                        console.error(`Error loading active podcast ${error}`)
                );
            } else {
                this.router.navigate(['podcasts', selectedPodcast]);
            }
        }
        this.route.params.subscribe(p => {
            if (p && p['podcast']) {
                this._initialiseState(p['podcast']);
            }
        });
    }
    ngOnDestroy() {
        this.onComponentDestroy$.next();
    }
    _initialiseState(id: string) {
        this.id = id;
        this.podcasts$ = this.podcastStoreService.entities$.pipe(
            map(r =>
                r.filter(it => {
                    return it.slug === id;
                })
            )
        );
        this.podcasts$
            .pipe(takeUntil(this.onComponentDestroy$))
            .subscribe(p => {
                if (p && p.length !== 0) {
                    this.noPodcasts = !(p.entries.length === 0);
                    this.selectedPodcast$.next(p[0]);
                    this.loading = false;
                    localStorage.setItem('__spslug', id);
                }
                // } else {
                //     //TODO: Check this is correct, have a feeling that this is called twice
                //     //so this else will always be hit the first time
                //     this.noPodcasts = true;
                //     localStorage.removeItem('__spslug');
                //     this.loading = false;
                //     this.router.navigate(['podcasts/add']);
                // }
            });
    }
    @HostListener('dragover', ['$event']) onDragOver(evt) {
        console.log('podcast.component', 'onDragOver', evt);
        evt.preventDefault();
        evt.stopPropagation();
        if (this.uploadMode !== this.uploadModes.fromLocalFile) {
            this.uploadMode = this.uploadModes.fromLocalFile;
        } else {
            this.uploadMode = this.uploadModes.none;
        }
    }
    @HostListener('dragleave', ['$event']) public onDragLeave(evt) {
        console.log('podcast.component', 'onDragLeave', evt);
        if (this.uploadMode !== this.uploadModes.fromLocalFile) {
            evt.preventDefault();
            evt.stopPropagation();
            this.uploadMode = this.uploadModes.none;
        }
    }
    @HostListener('drop', ['$event']) public onDrop(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.uploadMode = this.uploadModes.none;
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
        this.selectedPodcast$.next(podcast[0]);
        this.changeDetectorRef.detectChanges();
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
