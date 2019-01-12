import { Component, OnInit, Input } from '@angular/core';
import { MasterDetailCommands, Podcast } from '../../../core';
import { LocalStorage } from 'ngx-store';
import { PodcastLocalStateService } from '../../../shared/services/podcast-local-state.service';

@Component({
    selector: 'app-sidebar-podcast-item',
    templateUrl: './sidebar-podcast-item.component.html',
    styleUrls: ['./sidebar-podcast-item.component.scss']
})
export class SidebarPodcastItemComponent implements OnInit {

    @Input()
    podcast: Podcast;

    newEpisodes: boolean = false;
    constructor(private podcastStateService: PodcastLocalStateService) { }

    ngOnInit() {
        const state = this.podcastStateService.getPodcastState(this.podcast.id);
        console.log('SidebarPodcastItemComponent', 'ngOnInit', state);
        this.newEpisodes = state.fullValue.hasNewEpisodes;
    }

}
