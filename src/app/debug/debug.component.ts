import { Component, OnInit } from '@angular/core';
import { PodcastDataService } from '../podcasts/podcast-data.service';
import { Podcast, PodcastEntry } from '../core';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-debug',
    templateUrl: './debug.component.html',
    styleUrls: ['./debug.component.scss']
})
export class DebugComponent implements OnInit {
    constructor(private podcastDataService: PodcastDataService) {}

    ngOnInit() {}

    clickProcess($event: () => void) {
        setTimeout(() => $event(), 2000);
    }
}
