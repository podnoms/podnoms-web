import { map } from 'rxjs/operators';
import { Component, ChangeDetectorRef } from '@angular/core';
import { Podcast } from '../../core';
import { PodcastStoreService } from '../podcast-store.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { UploadModes } from '../upload-modes.enum';
import { PodcastDataService } from '../podcast-data.service';
import { AlertService } from '../../core/alert.service';

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
        private podcastStore: PodcastStoreService,
        private podcastDataService: PodcastDataService,
        private router: Router,
        private route: ActivatedRoute,
        private alertService: AlertService,
        private changeDetectorRef: ChangeDetectorRef
    ) {
        if (this.route.snapshot.params.podcast) {
            this._initialiseState(this.route.snapshot.params.podcast); // reset and set based on new parameter this time
        } else {
            const listenSub = this.podcastStore.entities$.subscribe(r => {
                if (r && r.length > 0) {
                    // here lies the problem: r[0] is meaningless!!
                    this.router.navigate(['podcasts', r[0].slug]);
                    if (listenSub) {
                        listenSub.unsubscribe(); // don't need to listen for subscriptions anymore as ngrx-data handles this for us
                    }
                } else {
                    this.noPodcasts = true;
                }
            });
        }
        this.route.params.subscribe(p => {
            if (p && p['podcast']) {
                this._initialiseState(p['podcast']);
            }
        });
    }
    _initialiseState(id: string) {
        this.id = id;
        this.podcasts$ = this.podcastStore.entities$.pipe(
            map(r =>
                r.filter(it => {
                    return it.slug === id;
                })
            )
        );
        this.podcasts$.subscribe(p => {
            if (p && p.length !== 0) {
                this.selectedPodcast$.next(p[0]);
            }
        });
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
    deletePodcast(podcast: Podcast) {
        console.log('PodcastComponent', 'deletePodcast');
        this.podcastDataService.deletePodcast(podcast.id).subscribe(
            r => {
                if (r) {
                    this.podcastStore.removeOneFromCache(podcast);
                    this.router.navigate(['/']);
                } else {
                    this.alertService.error('Error', 'There was an error deleting podcast.');
                }
            },
            () => this.alertService.error('Error', 'There was an error deleting podcast.')
        );
    }
}
