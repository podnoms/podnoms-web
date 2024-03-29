import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NGXLogger } from 'ngx-logger';
import { Podcast } from '../../../core';
import { AlertService } from '../../../core/alerts/alert.service';
import { Notification } from '../../../core/model/notification';
import { NotificationOptionBase } from '../../../core/model/notification-option-base';
import { PodcastStoreService } from '../../podcast-store.service';
import { NotificationControlService } from '../services/notification-control.service';
import { NotificationDataService } from '../services/notification-data.service';
import { NotificationStoreService } from '../services/notification-store.service';

@Component({
    selector: 'app-notification-modal',
    templateUrl: './notification-modal.component.html',
    styleUrls: ['./notification-modal.component.scss'],
})
export class NotificationModalComponent {
    @Input()
    podcast: Podcast;

    @ViewChild('content')
    content: ElementRef;

    notification: Notification;
    form: UntypedFormGroup;

    constructor(
        private modalService: NgbModal,
        private ncs: NotificationControlService,
        private nds: NotificationDataService,
        private nss: NotificationStoreService,
        private pss: PodcastStoreService,
        private alertService: AlertService,
        private logger: NGXLogger
    ) {}

    openModal(type: string) {
        this.nds.getConfig(type).subscribe((r) => {
            this.logger.debug('notifications.component', 'addNotification', r);
            this.notification = r || null;
            if (this.notification) {
                this._createForm(this.notification.options);
            }
        });
    }
    _createForm(config: NotificationOptionBase<string>[]) {
        this.form = this.ncs.toFormGroup(config);
        this.modalService.open(this.content, { size: 'lg' }).result.then(
            (result) =>
                this.logger.debug(
                    'notification-modal.component',
                    'result',
                    result
                ),
            (reason) => {
                if (reason === 'save') {
                    this.saveChanges();
                }
            }
        );
    }
    openEditModal(notification: Notification) {
        this.logger.debug(
            'notification-modal.component',
            'openEditModal',
            notification
        );
        this.notification = notification;
        this._createForm(notification.options);
    }
    saveChanges() {
        const model = this.form;
        const notification: Notification = new Notification();
        const isNew = this.notification.id == null;
        notification.id = this.notification.id || null;

        notification.podcastId = this.podcast.id;
        notification.type = this.notification.type;
        notification.options = [];

        Object.keys(this.form.value).forEach((e) => {
            const option = new NotificationOptionBase<string>({
                key: e,
                value: model.value[e],
            });
            notification.options.push(option);
        });
        this.nds.saveChanges(notification).subscribe((n) => {
            // this.nss.upsertOneInCache(n);
            // this is shite - ngrx/data doesn't handle master-detail well though
            if (isNew) {
                this.podcast.notifications.push(n);
            } else {
                // find and update existing
                const index = this.podcast.notifications.findIndex(
                    (r) => r.id === n.id
                );
                if (index !== -1) {
                    this.podcast.notifications[index] = n;
                }
            }
            this.pss.updateOneInCache(this.podcast);
        });
    }
    testNotification() {
        this.alertService.error('Error', 'Coming Soon!!!');
    }
}
