import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NotificationConfig } from '../models/notification';
import { NotificationControlService } from '../services/notification-control.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationDataService } from '../services/notification-data.service';
import { NotificationStoreService } from '../services/notification-store.service';
import { Podcast } from '../../../core';
import { Notification } from '../models/notification';

@Component({
    selector: 'app-notification-modal',
    templateUrl: './notification-modal.component.html',
    styleUrls: ['./notification-modal.component.scss']
})
export class NotificationModalComponent implements OnInit {
    @Input()
    podcast: Podcast;

    @ViewChild('content')
    content: ElementRef;

    notificationConfig: NotificationConfig;
    form: FormGroup;

    constructor(
        private modalService: NgbModal,
        private ncs: NotificationControlService,
        private nds: NotificationDataService,
        private nss: NotificationStoreService
    ) {}

    ngOnInit() {
        console.log('notification-modal.component', 'ngOnInit', 'notification');
    }
    openModal(type: string) {
        this.nds.getConfig(type).subscribe(r => {
            console.log('notifications.component', 'addNotification', r);
            this.notificationConfig = r || null;
            if (this.notificationConfig) {
                this.form = this.ncs.toFormGroup(this.notificationConfig.configs);
                this.modalService.open(this.content, { size: 'lg' }).result.then(
                    result => {
                        // this.nss.upsertOneInCache();
                        console.log('notification-modal.component', 'result', result);
                    },
                    reason => {}
                );
            }
        });
    }
    onSubmit() {
        const model = this.form;
        const notification: Notification = new Notification();

        notification.podcastId = this.podcast.id;
        notification.type = this.notificationConfig.type;
        notification.options = [];

        Object.keys(this.form.value).forEach(e => {
            console.log('notification-modal.component', 'pushing', model[e]);
            notification.options.push({ key: e, value: model.value[e] });
        });
        this.nds.saveChanges(notification).subscribe(n => this.nss.upsertOneInCache(n));
    }
}
