import { Injectable } from '@angular/core';
import { ToastService } from '../shared/components/toast/toast.service';
import { ToastType, ToastMessage } from '../shared/components/toast/toast-models';

@Injectable()
export class AlertService {
    constructor(private toaster: ToastService) {}

    info(title: string, message: string, image: string = '', options: any = null): ToastMessage {
        const m = this.toaster.showToast(title, message, {
            image: image,
            type: ToastType.Info,
            ...options
        });

        return m;
    }
    success(title: string, message: string, image: string = '') {
        this.toaster.showToast(title, message, {
            image: image,
            type: ToastType.Success
        });
    }
    error(title: string, message: string, image: string = '') {
        this.toaster.showToast(title, message, {
            image: image,
            type: ToastType.Error
        });
    }
}
