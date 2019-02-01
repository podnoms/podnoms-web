import { Injectable, Injector, EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ToastMessage, ToastType, ToastAction } from './toast-models';
import { Router, NavigationStart } from '@angular/router';

@Injectable({
    providedIn: 'root'
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
    showToast(title: string, message: string, options: any): ToastMessage {
        const args = {
            title: title,
            message: message,
            autoClose: options.autoClose || true,
            ...options
        };
        const m = <ToastMessage>args;
        m.id = Math.random()
            .toString(36)
            .substring(3);
        m.click = new EventEmitter<{}>();
        this.subject.next(args);
        return m;
    }
    clear() {
        this.subject.next();
    }
}
