import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Notification } from '../models/notification';

@Component({
    selector: 'app-notification-item',
    templateUrl: './notification-item.component.html',
    styleUrls: ['./notification-item.component.scss']
})
export class NotificationItemComponent implements OnInit {
    @Input()
    notification: Notification;

    @Output()
    public notificationEdit = new EventEmitter();

    ngOnInit() {}

    editNotification() {
        this.notificationEdit.emit();
    }

    deleteNotification() {
    }
}
