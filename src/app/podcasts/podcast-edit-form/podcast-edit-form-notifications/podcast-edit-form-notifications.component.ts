import { Component, OnInit, Input } from '@angular/core';
import { Podcast } from '../../../core';

@Component({
    selector: 'app-podcast-edit-form-notifications',
    templateUrl: './podcast-edit-form-notifications.component.html',
    styleUrls: ['./podcast-edit-form-notifications.component.scss']
})
export class PodcastEditFormNotificationsComponent implements OnInit {
    @Input() podcast: Podcast;
    constructor() {}

    ngOnInit() {}
}
