import { map } from 'rxjs/operators';
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MasterDetailCommands, Podcast } from '../../core';
import { PodcastStoreService } from '../podcast-store.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { EntityOp } from 'ngrx-data';

import { UploadModes } from '../upload-modes.enum';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
    selector: 'app-podcast',
    templateUrl: './podcast.component.html',
    styleUrls: ['./podcast.component.scss']
})
export class PodcastComponent {
    uploadModes = UploadModes; // do this so it can be used in the template
    uploadMode: UploadModes = UploadModes.none; // do this so it can be used in the template

    podcasts$: Observable<Podcast[]>;
    selectedPodcast$: BehaviorSubject<Podcast> = new BehaviorSubject<Podcast>(null);
    loading$: Observable<boolean>;
    mode: UploadModes = UploadModes.fromUrl;
    id: any;

    constructor(
        private service: PodcastStoreService,
        private router: Router,
        private route: ActivatedRoute,
        private changeDetectorRef: ChangeDetectorRef,
        public modalService: NgxSmartModalService
    ) {
        this.id = this.route.snapshot.params.podcast;
        if (this.id) {
            this._initialiseState(); // reset and set based on new parameter this time
            this.route.params.subscribe(params => {
                this.id = params['podcast'];
                this._initialiseState(); // reset and set based on new parameter this time
            });
        } else {
            this.service.entities$.subscribe(r => {
                if (r && r.length > 0) {
                    this.router.navigate(['podcasts', r[0].slug]);
                }
            });
        }
    }
    _initialiseState() {
        this.podcasts$ = this.service.entities$.pipe(
            map(r => r.filter(it => it.slug === this.id))
        );
        this.podcasts$.subscribe(p => {
            this.selectedPodcast$.next(p[0]);
        });
    }
    podcastUpdated(podcast: Podcast) {
        this.selectedPodcast$.next(podcast[0]);
        this.changeDetectorRef.detectChanges();
    }
}
