import { NotificationItemDeleteComponent } from './notification-item-delete.component';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Notification } from '../../../core/model/notification';
import { UtilsService } from '../../../utils/utils.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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

    constructor(
        private modalService: NgbModal,
        private utilsService: UtilsService
    ) {}
    ngOnInit() {}

    __(c: string) {
        return this.utilsService.stringToColour(c);
    }

    editNotification() {
        this.notificationEdit.emit();
    }
    showNotificationDeleteDialog() {
        const modalRef = this.modalService.open(
            NotificationItemDeleteComponent
        );
        modalRef.componentInstance.entry = this.entry;
        modalRef.result.then(r => {
            if (r === 'delete') {
                this.notificationDelete.emit();
            }
        });
    }
}
