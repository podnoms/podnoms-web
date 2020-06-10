import { EventEmitter } from '@angular/core';

export interface IToastPosition {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
    transform: string;
}
export enum ToastPosition {
    Top = 'TOP',
    TopRight = 'TOP_RIGHT',
    TopLeft = 'TOP_LEFT',
    Bottom = 'BOTTOM',
    BottomRight = 'BOTTOM_RIGHT',
    BottomLeft = 'BOTTOM_LEFT',
}

export enum ToastType {
    Success = 'success',
    Error = 'error',
    Alert = 'alert',
    Info = 'info',
    Warn = 'warn',
    Bare = 'bare',
}
export class ToastAction {
    id: string;
    action: string;
}
export class ToastMessage {
    id?: string;
    title: string;
    position: ToastPosition = ToastPosition.Top;
    message: string;
    type: ToastType;
    image?: string;
    autoClose: boolean = true;
    showCloseButton?: boolean = true;
    showProgressBar: boolean = true;
    state: string;
    timeOut: number = 5000;
    click?: EventEmitter<{}>;
}
