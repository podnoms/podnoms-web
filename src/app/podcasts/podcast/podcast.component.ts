import { takeUntil, pluck, take, catchError } from 'rxjs/operators';
import { Component, OnDestroy, ViewChild, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Podcast } from '../../core';
import { PodcastStoreService } from '../podcast-store.service';
import { Observable, Subject, EMPTY } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { UploadMode } from '../upload-mode.enum';
import { PodcastDataService } from '../podcast-data.service';
import { AlertService } from '../../core/alerts/alert.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PodcastDeleteComponent } from '../podcast-delete.component';
import { PodcastDetailComponent } from '../podcast-detail/podcast-detail.component';
import { environment } from 'environments/environment';
import { BasePageComponent } from 'app/shared/components/base-page/base-page.component';
import { DataServiceError } from '@ngrx/data';

@Component({
  selector: 'app-podcast',
  templateUrl: './podcast.component.html',
  styleUrls: ['./podcast.component.scss'],
})
export class PodcastComponent
  extends BasePageComponent
  implements OnDestroy, OnInit {
  UPLOADMODE = UploadMode; // do this so it can be used in the template
  uploadMode: UploadMode = UploadMode.none; // do this so it can be used in the template
  loading$: Observable<boolean>;
  noPodcasts: boolean = false;
  podcast$: Observable<Podcast> = new Observable();
  publicPageEnabled: boolean = environment.publicPageEnabled;

  @ViewChild('podcastDetail')
  podcastDetailComponent: PodcastDetailComponent | undefined;

  mode: UploadMode = UploadMode.fromUrl;
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
    this._destroyed$ = new Subject();
    this.loading$ = this.podcastStoreService.loading$;
  }

  ngOnInit() {
    if (this.route.snapshot.params['podcast']) {
      this._initialiseState(this.route.snapshot.params['podcast']);
      this.route.params
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
  override ngOnDestroy() {
    this._destroyed$.next(null);
    this._destroyed$.complete();
  }
  _initialiseState(id: string) {
    // TODO: take this out, weird Chrome/Angular bug
    if (id !== 'undefined') {
      this.logger.debug('podcast.component', '_initialiseState', id);
      this.podcast$ = this.podcastStoreService.getByKey(id).pipe(
        catchError((err: DataServiceError) => {
          console.log('podcast.component', 'podcastStoreService_error', err);
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
  startUpload(uploadMode: UploadMode) {
    this.uploadMode = uploadMode;
  }
  podcastUpdated() {
    // this is a little funky but it works..
    this.podcastDetailComponent?.detectChanges();
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
    if (!podcast.id) return;
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
