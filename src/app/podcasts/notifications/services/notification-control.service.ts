import { Injectable } from '@angular/core';
import { NotificationOptionBase } from '../../../core/model/notification-option-base';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Injectable()
export class NotificationControlService {
    constructor() {}

    toFormGroup(questions: NotificationOptionBase<any>[]) {
        const group: any = {};

        questions.forEach(question => {
            group[question.key] = question.required
                ? new FormControl(question.value || '', Validators.required)
                : new FormControl(question.value || '');
        });
        return new FormGroup(group);
    }
}
