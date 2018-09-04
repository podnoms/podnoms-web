import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Notification } from '../models/notification';
import { UtilsService } from '../../../utils/utils.service';

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
    constructor(private us: UtilsService) {}
    ngOnInit() {}

    __(c: string) {
        return this.us.stringToColour(c);
    }

    editNotification() {
        this.notificationEdit.emit();
    }

    deleteNotification() {}
}
