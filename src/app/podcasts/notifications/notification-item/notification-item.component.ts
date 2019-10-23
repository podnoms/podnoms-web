import { NotificationItemDeleteComponent } from './notification-item-delete.component';
import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
    AfterViewInit
} from '@angular/core';
import { Notification } from '../../../core/model/notification';
import { UtilsService } from '../../../utils/utils.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationDataService } from '../services/notification-data.service';

@Component({
    selector: 'app-notification-item',
    templateUrl: './notification-item.component.html',
    styleUrls: ['./notification-item.component.scss']
})
export class NotificationItemComponent implements AfterViewInit {
    @Input()
    notification: Notification;

    @Output()
    public notificationEdit = new EventEmitter();
    @Output()
    
    public notificationDelete = new EventEmitter();

    lastRunTime: Date;
    lastRunStatus: string = '';

    constructor(
        private modalService: NgbModal,
        private notificationService: NotificationDataService,
        private utilsService: UtilsService
    ) {}

    ngAfterViewInit() {
        this.notificationService
            .getLastRunStatus(this.notification.id)
            .subscribe(s => {
                this.lastRunTime = s.createDate;
            });
    }

    getIcon(type: string): string {
        switch (type) {
            case 'Twitter':
                return 'fab fa-twitter';
            case 'IFTTT':
                return 'fa-question fa-ifttt';
            case 'Slack':
                return 'fab fa-slack';
            case 'Email':
                return 'fa-envelope-open';
            case 'Facebook':
                return 'fab fa-facebook';
            case 'WebHook':
                return 'fas fa-fire fa-webhook';
            case 'PushBullet':
                return 'fa-bullseye fa-pushbullet';
            default:
                return 'fa-hashtag';
        }
    }
    editNotification() {
        this.notificationEdit.emit();
    }
    showNotificationDeleteDialog() {
        const modalRef = this.modalService.open(
            NotificationItemDeleteComponent
        );
        modalRef.result.then(r => {
            if (r === 'delete') {
                this.notificationDelete.emit();
            }
        });
    }
}
