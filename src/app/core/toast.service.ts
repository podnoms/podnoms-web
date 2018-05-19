import { Injectable } from '@angular/core';
// import { MatSnackBar } from '@angular/material';
import { isE2E } from './e2e-check';
import { NotificationsService } from 'angular2-notifications';

@Injectable()
export class ToastService {
    constructor(private _service: NotificationsService) {}

    openSnackBar(message: string, action: string) {
        if (isE2E) {
            console.log(`${message} - ${action}`);
        } else {
            this._service.success(message, action, {
                timeOut: 3000,
                showProgressBar: true,
                pauseOnHover: true,
                clickToClose: true
            });
        }
    }
}
