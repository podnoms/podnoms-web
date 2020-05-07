import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Notification } from '../../../core/model/notification';
import { Podcast } from '../../../core';
import { Observable } from 'rxjs';
import { NotificationDataService } from '../services/notification-data.service';
import { NgxFancyLoggerService } from 'ngx-fancy-logger';

@Component({
    selector: 'app-notifications',
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
    @Input()
    podcast: Podcast;
    @Output()
    updated: EventEmitter<Podcast> = new EventEmitter();

    notifications: Notification[];
    types$: Observable<string>;

    constructor(
        private nds: NotificationDataService,
        protected logger: NgxFancyLoggerService
    ) {}
    ngOnInit() {
        this.types$ = this.nds.getTypes();
        this.notifications = this.podcast.notifications;
    }
    deleteNotification(notification: Notification) {
        this.logger.debug(
            'notifications.component',
            'deleteNotification',
            notification
        );
        this.nds.deleteNotification(notification).subscribe(result => {
            this.podcast.notifications = this.podcast.notifications.filter(
                r => r.id !== notification.id
            );
            this.notifications = this.podcast.notifications;
            this.updated.emit(this.podcast);
        });
    }
}
