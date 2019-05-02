import { Injectable, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UiStateService {
    _sidebarOpen: boolean = true;
    sidebarOpen: BehaviorSubject<boolean>;

    overlayOpen: boolean = false;

    constructor() {
        this.sidebarOpen = new BehaviorSubject<boolean>(this._sidebarOpen);
    }

    toggleSidebar() {
        this._sidebarOpen = !this._sidebarOpen;
        this.sidebarOpen.next(this._sidebarOpen);
    }
    toggleOverlay() {
        this.overlayOpen = !this.overlayOpen;
    }
}
