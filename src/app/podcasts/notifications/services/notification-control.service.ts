import { Injectable } from '@angular/core';
import { NotificationOptionBase } from '../../../core/model/notification-option-base';
import { UntypedFormControl, Validators, UntypedFormGroup } from '@angular/forms';

@Injectable()
export class NotificationControlService {
  constructor() {}

  toFormGroup = (questions: NotificationOptionBase<any>[]) => {
    const group: any = {};
    questions.forEach((question) => {
      group[question.key] = question.required
        ? new UntypedFormControl(question.value || '', Validators.required)
        : new UntypedFormControl(question.value || '');
    });
    return new UntypedFormGroup(group);
  };
  getNotificationIcon = (notificationType: string): string => {
    switch (notificationType) {
      case 'Twitter':
        return 'fa-brands fa-twitter';
      case 'IFTTT':
        return 'fa-solid fa-house-crack';
      case 'Slack':
        return 'fa-brands fa-slack';
      case 'Email':
        return 'fa-solid fa-envelope';
      case 'Facebook':
        return 'fa-brands fa-facebook';
      case 'WebHook':
        return 'fa-solid fa-explosion';
      case 'PushBullet':
        return 'fa-solid fa-bullseye';
      default:
        return 'fa-solid fa-bolt-lightning';
    }
  };
  getNotificationColour = (
    notificationType: string,
    prefix: 'bg' | 'text' = 'bg'
  ): string => `${prefix}-${notificationType.toLowerCase()}`;
}
