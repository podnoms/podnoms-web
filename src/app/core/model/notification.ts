import { NotificationOptionBase } from './notification-option-base';

export class Notification {
    id?: string;
    podcastId?: string;
    type: string;
    options: NotificationOptionBase<string>[];
}

export class NotificationLog {
    createDate: Date;
    log: string;
}
