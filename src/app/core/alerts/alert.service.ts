import { Injectable } from '@angular/core';
import { AlertOptions } from './alert.options';
import { ToastService } from 'app/shared/components/toast/toast.service';
import {
    ToastMessage,
    ToastType,
} from 'app/shared/components/toast/toast-models';

@Injectable()
export class AlertService {
    constructor(private toaster: ToastService) {}

    info(title: string, message: string, options?: AlertOptions): ToastMessage {
        return this.toaster.showToast(title, message, {
            ...(options || new AlertOptions()),
            ...{
                type: ToastType.Info,
            },
        });
    }
    success(title: string, message: string, options?: AlertOptions) {
        return this.toaster.showToast(title, message, {
            ...(options || new AlertOptions()),
            ...{
                type: ToastType.Success,
            },
        });
    }
    warn(title: string, message: string, options?: AlertOptions) {
        return this.toaster.showToast(title, message, {
            ...(options || new AlertOptions()),
            ...{
                type: ToastType.Warn,
                timeOut: 5000000,
            },
        });
    }
    error(title: string, message: string, options?: AlertOptions) {
        return this.toaster.showToast(title, message, {
            ...(options || new AlertOptions()),
            ...{
                type: ToastType.Error,
            },
        });
    }
}
