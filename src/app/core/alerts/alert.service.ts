import { Injectable } from '@angular/core';
import { AlertOptions } from './alert.options';
import { ToastService } from 'app/shared/components/toast/toast.service';
import {
    ToastMessage,
    ToastType
} from 'app/shared/components/toast/toast-models';

@Injectable()
export class AlertService {
    constructor(private toaster: ToastService) {}

    info(
        title: string,
        message: string,
        image?: string,
        options?: any
    ): ToastMessage {
        return this.toaster.showToast(title, message, {
            image: image || 'assets/img/feedback/information.png',
            type: ToastType.Info,
            ...options
        });
    }
    success(
        title: string,
        message: string,
        image?: string,
        options?: AlertOptions
    ) {
        return this.toaster.showToast(title, message, {
            image: image || 'assets/img/feedback/success.png',
            type: ToastType.Success,
            ...options
        });
    }
    error(
        title: string,
        message: string,
        image?: string,
        options?: AlertOptions
    ) {
        return this.toaster.showToast(title, message, {
            image: image || 'assets/img/feedback/warning.png',
            type: ToastType.Error,
            ...options
        });
    }
}
