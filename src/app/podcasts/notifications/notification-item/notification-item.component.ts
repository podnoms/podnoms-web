import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Notification } from '../../../core/model/notification';
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
    @Output()
    public notificationDelete = new EventEmitter();

    constructor(private utilsService: UtilsService) {}
    ngOnInit() {}

    __(c: string) {
        return this.utilsService.stringToColour(c);
    }

    editNotification() {
        this.notificationEdit.emit();
    }

    deleteNotification() {
        this.notificationDelete.emit();
    }
}
