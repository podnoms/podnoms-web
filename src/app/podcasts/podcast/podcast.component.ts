import { map } from 'rxjs/operators';
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MasterDetailCommands, Podcast } from '../../core';
import { PodcastStoreService } from '../podcast-store.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { EntityOp } from 'ngrx-data';

import { UploadModes } from '../upload-modes.enum';
import { PodcastDataService } from '../podcast-data.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
    selector: 'app-podcast',
    templateUrl: './podcast.component.html',
    styleUrls: ['./podcast.component.scss']
})
export class PodcastComponent {
    uploadModes = UploadModes; // do this so it can be used in the template
    uploadMode: UploadModes = UploadModes.none; // do this so it can be used in the template

    noPodcasts: boolean = false;
    podcasts$: Observable<Podcast[]>;
    selectedPodcast$: BehaviorSubject<Podcast> = new BehaviorSubject<Podcast>(null);
    loading$: Observable<boolean>;
    mode: UploadModes = UploadModes.fromUrl;
    id: any;

    constructor(
        private podcastStoreService: PodcastStoreService,
        private podcastDataService: PodcastDataService,
        private router: Router,
        private route: ActivatedRoute,
        private notifier: NotificationsService,
        private changeDetectorRef: ChangeDetectorRef
    ) {
        this.id = this.route.snapshot.params.podcast;
        if (this.id) {
            this._initialiseState(); // reset and set based on new parameter this time
        } else {
            this.podcastStoreService.entities$.subscribe(r => {
                if (r && r.length > 0) {
                    this.router.navigate(['podcasts', r[0].slug]);
                } else {
                    this.noPodcasts = true;
                }
            });
        }
    }
    _initialiseState() {
        this.podcasts$ = this.podcastStoreService.entities$.pipe(
            map(r => r.filter(it => it.slug === this.id))
        );
        this.podcasts$.subscribe(p => {
            if (p && p.length === 0) {
                this.router.navigate(['podcasts']);
            } else {
                this.selectedPodcast$.next(p[0]);
            }
        });
    }
    podcastUpdated(podcast: Podcast) {
        this.selectedPodcast$.next(podcast[0]);
        this.changeDetectorRef.detectChanges();
    }
    deletePodcast(podcast: Podcast) {
        console.log('PodcastComponent', 'deletePodcast');
        this.podcastDataService.deletePodcast(podcast.id).subscribe(
            r => {
                if (r) {
                    this.podcastStoreService.delete(podcast);
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
}
