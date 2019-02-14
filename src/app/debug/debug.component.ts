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
    entry$: Observable<Podcast>;
    entry: PodcastEntry;
    fileSize: number = -1;
    constructor(private podcastDataService: PodcastDataService) {
        this.entry$ = podcastDataService.getById('10298d03-c08e-4904-4012-08d678528682');
    }

    ngOnInit() {
        this.podcastDataService.getById('10298d03-c08e-4904-4012-08d678528682').subscribe(p => {
            console.log('debug.component', 'ngOnInit', p);
            this.entry = p.podcastEntries[0];
        });
    }
}
