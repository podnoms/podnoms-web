import { Injectable, Injector, EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
    ToastMessage,
    ToastType,
    ToastAction,
    ToastPosition,
} from './toast-models';
import { Router, NavigationStart } from '@angular/router';
import { AlertOptions } from '../../../core/alerts/alert.options';

@Injectable({
    providedIn: 'root',
})
export class ToastService {
    private subject = new Subject<ToastMessage>();
    public emitter = new Subject<ToastAction>();

    constructor(private router: Router) {}
    set(toast: ToastMessage, arg1: boolean): any {
        this.emitter.next({ id: toast.id, action: 'remove' });
    }
    getToasts(): Observable<any> {
        return this.subject.asObservable();
    }
    showToast(
        title: string,
        message: string,
        options: AlertOptions
    ): ToastMessage {
        const args: ToastMessage = {
            title: title,
            message: message,
            showProgressBar: options.showProgressBar,
            autoClose: options.autoClose,
            showCloseButton: options.showCloseButton,
            position: ToastPosition.Top,
            timeOut: options.timeOut,
            click: options.click,
            image: options.image,
            type: options.type,
            state: 'open',
        };
        const m = <ToastMessage>args;
        m.id = Math.random().toString(36).substring(3);
        m.click = new EventEmitter<{}>();
        this.subject.next(args);
        return m;
    }
    clear() {
        this.subject.next(null);
    }
}
