import { NotificationOptionBase } from './notification-option-base';

export class NotificationOptionText extends NotificationOptionBase<string> {
    controlType = 'textbox';
    type: string;

    constructor(options: {} = {}) {
        super(options);
        this.type = options['type'] || '';
    }
}
