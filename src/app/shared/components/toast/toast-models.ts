import { EventEmitter } from '@angular/core';

export class ToastMessage {
    id: string;
    title: string;
    message: string;
    type: ToastType;
    image?: string;
    autoClose: boolean = true;
    state: string;

    click?: EventEmitter<{}>;

    constructor(init?: Partial<ToastMessage>) {
        this.id = Math.random()
            .toString(36)
            .substring(3);
        this.state = 'fromRight';
        Object.assign(this, init);
    }
}
export enum ToastType {
    Success = 'success',
    Error = 'error',
    Alert = 'alert',
    Info = 'info',
    Warn = 'warn',
    Bare = 'bare'
}
export class ToastAction {
    id: string;
    action: string;
}
