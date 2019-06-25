import { Injectable, HostListener } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UiStateService {
    private _sidebarOpen: boolean = true;
    sidebarOpen: BehaviorSubject<boolean>;
    sidebarOpenMobile: BehaviorSubject<boolean>;

    overlayOpen: boolean = false;
    viewportWidth: number;

    constructor() {
        this.sidebarOpen = new BehaviorSubject<boolean>(this._sidebarOpen);
        this.sidebarOpenMobile = new BehaviorSubject<boolean>(false);
    }

    toggleSidebar() {
        if (this.isMobile()) {
            this._sidebarOpen = true;
            this.sidebarOpenMobile.next(this._sidebarOpen);
        } else {
            this._sidebarOpen = !this._sidebarOpen;
        }
        this.sidebarOpen.next(this._sidebarOpen);
    }
    toggleOverlay() {
        this.overlayOpen = !this.overlayOpen;
    }
    closeMobileSidebar() {
        if (this.isMobile()) {
            this._sidebarOpen = false;
            this.sidebarOpen.next(this._sidebarOpen);
            this.sidebarOpenMobile.next(this._sidebarOpen);
        }
    }
    @HostListener('window:resize', ['$event'])
    onResize(event) {
        console.log('ui-state.service', 'onResize', event);
        this.viewportWidth = event.target.innerWidth;
    }

    isMobile(): boolean {
        return window.innerWidth < 961;
    }
}
