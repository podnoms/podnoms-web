import { EventEmitter } from '@angular/core';

export class AlertOptions {
    image?: string;
    autoClose: boolean = true;
    timeOut?: number = 5000;
    click?: EventEmitter<{}>;
}
