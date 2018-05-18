import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UiStateService {
    sidebarOpen: boolean = true;
    overlayOpen: boolean = false;

    constructor() {}

    toggleSidebar() {
        this.sidebarOpen = !this.sidebarOpen;
    }
    toggleOverlay() {
        this.overlayOpen = !this.overlayOpen;
    }
}
