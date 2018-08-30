import { Component, OnInit, Input } from '@angular/core';
import { NotificationDataService } from '../services/notification-data.service';
import { Observable } from 'rxjs';
import { NotificationConfig } from '../models/notification';
import { Podcast } from '../../../core';

@Component({
    selector: 'app-notifications',
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
    @Input()
    podcast: Podcast;
    notifications: Array<NotificationConfig> = new Array<NotificationConfig>();
    types$: Observable<string>;

    constructor(private notificationsService: NotificationDataService) {}

    ngOnInit() {
        this.types$ = this.notificationsService.getTypes();
    }
}
