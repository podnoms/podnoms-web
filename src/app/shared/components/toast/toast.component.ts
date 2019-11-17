import { Component, OnInit } from '@angular/core';
import { ToastMessage, ToastType } from './toast-models';
import { ToastService } from './toast.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-toast',
    templateUrl: './toast.component.html',
    styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {
    toasts: ToastMessage[] = [];
    private listener: Subscription;

    constructor(private toastService: ToastService) {}

    ngOnInit() {
        this.toastService.getToasts().subscribe((toast: ToastMessage) => {
            if (!toast) {
                this.toasts = [];
                return;
            }
            this.toasts.push(toast);
        });

        this.listener = this.toastService.emitter.subscribe(r => {
            switch (r.action) {
                case 'remove':
                    this.removeToast(r.id);
            }
        });
    }
    removeAlert(alert: ToastMessage) {
        this.toasts = this.toasts.filter(x => x !== alert);
    }

    removeToast(id: string): void {
        let indexOfDelete = 0;
        let doDelete = false;
        let noti;

        this.toasts.forEach((toast, index) => {
            if (toast.id === id) {
                indexOfDelete = index;
                noti = toast;
                doDelete = true;
            }
        });

        if (doDelete) {
            this.toasts.splice(indexOfDelete, 1);
        }
    }
}
