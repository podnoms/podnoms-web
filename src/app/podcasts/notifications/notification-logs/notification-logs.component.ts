import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Notification, NotificationLog } from '../../../core/model/notification';
import { NotificationDataService } from '../services/notification-data.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-notification-logs',
    templateUrl: './notification-logs.component.html',
    styleUrls: ['./notification-logs.component.scss']
})
export class NotificationLogsComponent implements AfterViewInit {
    @Input()
    notification: Notification;
    logs$: Observable<NotificationLog[]>;

    constructor(private notificationService: NotificationDataService) {}

    ngAfterViewInit() {
        this.logs$ = this.notificationService.getLogs(this.notification.id);
    }
}
