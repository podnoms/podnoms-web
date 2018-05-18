import { Component, OnInit, Input } from '@angular/core';
import { PodcastEntry } from '../../core';

@Component({
    selector: 'app-entry-list-item',
    templateUrl: './entry-list-item.component.html',
    styleUrls: ['./entry-list-item.component.scss']
})
export class EntryListItemComponent implements OnInit {
    @Input() entry: PodcastEntry;
    constructor() {}

    ngOnInit() {}
}
