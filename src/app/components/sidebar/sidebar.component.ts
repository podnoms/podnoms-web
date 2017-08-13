import { Component, OnInit } from '@angular/core';
import { PodcastsService } from '../../services/podcasts.service';
import { PodcastModel } from '../../models/podcasts.models';
import { Router, NavigationStart, NavigationEnd, ActivatedRoute } from '@angular/router';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
    podcasts: PodcastModel[];
    selectedPodcast: PodcastModel;

    constructor(private _service: PodcastsService, private _router: Router, private _activatedRoute: ActivatedRoute,) {
    }

    ngOnInit() {
        this._router.events
            .filter((event) => event instanceof NavigationEnd && event.url.substring(0, '/podcasts/'.length) === '/podcasts/')
            .map(() => this._activatedRoute)
            .subscribe((event) => {
                console.log('SidebarComponent', 'routeChanged', event.routeConfig);
                this._getPodcasts();
            });
    }

    private _getPodcasts() {
        this._service.getPodcasts().subscribe(podcasts => {
            this.podcasts = podcasts;
            if (this.podcasts.length != 0) {
                this.selectedPodcast = podcasts[0];
                this._router.navigateByUrl(`podcasts/${this.selectedPodcast.slug}`);
            }
        });
    }

    selectPodcast(slug) {
        this._router.navigateByUrl(`podcasts/${slug}`);
        this.selectedPodcast = this.podcasts.find(e => e.slug === slug)
        //[routerLink]="['/podcasts', podcast.slug]
    }

    deletePodcast() {
        if (this.selectedPodcast.id) {
            this._service.deletePodcast(this.selectedPodcast.id)
                .subscribe(r => {
                    console.log('PodcastComponent', 'deletePodcast', r);
                    this._getPodcasts();
                });
        }
    }
}
