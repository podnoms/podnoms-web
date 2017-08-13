import { Component, HostBinding } from '@angular/core';
import { Observable } from "rxjs";
import { PodcastModel } from './models/podcasts.models';
import { PodcastService } from './services/podcast.service';
import { Store } from "@ngrx/store";
import { AppStore } from './models/app.store';

@Component({
    selector: 'body',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    podcasts: Observable<Array<PodcastModel>>;
    selectedPodcast: Observable<PodcastModel>;

    @HostBinding('class') public cssClass = 'app header-fixed aside-menu-fixed aside-menu-hidden pace-done sidebar-hidden';

    constructor(private _podcastService: PodcastService, private _store: Store<AppStore>) {
        this.podcasts = _podcastService.podcasts;
        this.selectedPodcast = _store.select('selectedPodcast');
        this.selectedPodcast.subscribe(v => console.log(v));
        _podcastService.loadPodcasts(); // "itemsService.loadItems" dispatches the "ADD_ITEMS" event to our store,
    }                           // which in turn updates the "items" collection
}
