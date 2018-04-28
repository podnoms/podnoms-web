import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable()
export class UiStateService {
    sidebarOpen: boolean = false;
    overlayOpen: boolean = false;
    @Output() sidebarChanged: EventEmitter<boolean> = new EventEmitter();
    @Output() overlayChanged: EventEmitter<boolean> = new EventEmitter();

    constructor() {}

    toggleSidebar() {
        this.sidebarOpen = !this.sidebarOpen;
        this.sidebarChanged.emit(this.sidebarOpen);
    }
    toggleOverlay() {
        this.overlayOpen = !this.overlayOpen;
        this.overlayChanged.emit(this.overlayOpen);
    }
}
