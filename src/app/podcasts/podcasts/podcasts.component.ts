import { Component, OnInit, OnDestroy } from '@angular/core';
import { MasterDetailCommands, Podcast } from '../../core';
import { PodcastService } from '../podcast.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ActivatedRoute, Router } from '@angular/router';
import { EntityOp } from 'ngrx-data';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

@Component({
    selector: 'app-podcasts',
    templateUrl: './podcasts.component.html',
    styleUrls: ['./podcasts.component.scss']
})
export class PodcastsComponent {
    podcasts$: Observable<Podcast[]>;
    selectedPodcast$: Observable<Podcast>;
    loading$: Observable<boolean>;
    id: any;

    constructor(
        private service: PodcastService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.id = this.route.snapshot.params.podcast;
        if (this.id) {
            this._initialiseState(); // reset and set based on new parameter this time
            this.route.params.subscribe(params => {
                console.log('podcasts.component', 'paramChange', params);
                this.id = params['podcast'];
                this._initialiseState(); // reset and set based on new parameter this time
            });
        } else {
            const subscription = this.service.entities$.subscribe(r => {
                if (r && r.length > 0) {
                    subscription.unsubscribe();
                    this.router.navigate(['podcasts', r[0].slug]);
                }
            });
        }
    }
    _initialiseState() {
        this.podcasts$ = this.service.entities$.map(r =>
            r.filter(it => it.slug === this.id)
        );
        this.podcasts$.subscribe(p => {
            console.log('podcasts.component', 'selectedPodcast', p);
            this.selectedPodcast$ = Observable.of(p[0]);
        });
    }

    filterByID(item) {
        return item.filter(it => +it.id > 22);
    }
}
