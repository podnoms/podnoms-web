import { Component, OnInit, Input } from '@angular/core';
import { NotificationDataService } from '../services/notification-data.service';
import { Observable } from 'rxjs';
import { Notification } from '../models/notification';
import { Podcast } from '../../../core';
import { NotificationStoreService } from '../services/notification-store.service';

@Component({
    selector: 'app-notifications',
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
    @Input()
    podcast: Podcast;
    notifications$: Observable<Notification[]>;
    types$: Observable<string>;

    constructor(private nss: NotificationStoreService, private nds: NotificationDataService) {}

    ngOnInit() {
        this.types$ = this.nds.getTypes();
        this.notifications$ = this.nss.getWithQuery({ podcastId: this.podcast.id });
    }
}
