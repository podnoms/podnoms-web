import { Injectable } from '@angular/core';
import { NotificationOptionBase } from '../models/notification-option-base';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Injectable()
export class NotificationControlService {
    constructor() {}

    toFormGroup(questions: NotificationOptionBase<any>[]) {
        let group: any = {};

        questions.forEach(question => {
            group[question.key] = question.required
                ? new FormControl(question.value || '', Validators.required)
                : new FormControl(question.value || '');
        });
        return new FormGroup(group);
    }
}
