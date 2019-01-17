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
