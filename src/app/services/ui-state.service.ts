import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable()
export class UiStateService {
    overlayOpen: boolean = false;
    @Output() change: EventEmitter<boolean> = new EventEmitter();

    constructor() {}

    toggleOverlay() {
        this.overlayOpen = !this.overlayOpen;
        this.change.emit(this.overlayOpen);
    }
}
