import { Component, OnInit, Input } from '@angular/core';
import { PodcastEntry } from '../../core';

@Component({
    selector: 'app-entry-sharing',
    templateUrl: './entry-sharing.component.html',
    styleUrls: ['./entry-sharing.component.scss']
})
export class EntrySharingComponent implements OnInit {
    @Input() entry: PodcastEntry;
    constructor() {}

    ngOnInit() {}
}
