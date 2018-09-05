import { Component, OnInit, Input } from '@angular/core';
import { Notification } from '../../../core/model/notification';
import { Podcast } from '../../../core';
import { Observable } from 'rxjs';
import { NotificationDataService } from '../services/notification-data.service';

@Component({
    selector: 'app-notifications',
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
    @Input()
    podcast: Podcast;
    notifications: Notification[];
    types$: Observable<string>;

    constructor(private nds: NotificationDataService) {}
    ngOnInit() {
        this.types$ = this.nds.getTypes();
        this.notifications = this.podcast.notifications;
    }
}
