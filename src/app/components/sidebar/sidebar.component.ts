import { Component, OnInit } from '@angular/core';
import { MasterDetailCommands, Podcast } from '../../core';

import { Observable } from 'rxjs/Observable';
import { ComponentsService } from '../components.service';
import { PodcastService } from '../../podcasts/podcast.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    selected: Podcast;
    podcasts$: Observable<Podcast[]>;
    loading$: Observable<boolean>;

    constructor(private _podcastService: PodcastService) {
        this.podcasts$ = _podcastService.entities$;
        this.loading$ = _podcastService.loading$;
    }
    ngOnInit() {
        this._podcastService.getAll();
    }
}
