import { Injectable } from '@angular/core';
// import { MatSnackBar } from '@angular/material';
import { isE2E } from './e2e-check';
import { NotificationsService } from 'angular2-notifications';

@Injectable()
export class ToastService {
    constructor(private _service: NotificationsService) {}

    showToast(title: string, message: string) {
        if (isE2E) {
            console.log(`${title} - ${message}`);
        } else {
            this._service.success(title, message, {
                timeOut: 3000,
                showProgressBar: true,
                pauseOnHover: true,
                clickToClose: true
            });
        }
    }
}
