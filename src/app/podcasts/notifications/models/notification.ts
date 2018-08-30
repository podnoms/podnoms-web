import { NotificationOptionBase } from './notification-option-base';
import { Podcast } from '../../../core';

export interface INotificationOption {
    key: string;
    value: string;
}
export class NotificationConfig {
    type: string;
    configs: NotificationOptionBase<string>[];
}
export class Notification {
    id: string;
    podcastId: string;
    type: string;
    options: Array<INotificationOption>;
}
