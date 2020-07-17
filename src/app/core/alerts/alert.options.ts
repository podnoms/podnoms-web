import { EventEmitter } from '@angular/core';
import { ToastType } from 'app/shared/components/toast/toast-models';

export class AlertOptions {
    image?: string;
    type?: ToastType = ToastType.Info;
    showProgressBar?: boolean = true;
    autoClose?: boolean = true;
    showCloseButton?: boolean = true;
    timeOut?: number = 3000;
    click?: EventEmitter<{}>;
}
