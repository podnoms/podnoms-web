import { Injectable, HostListener } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UiStateService {
    private _sidebarOpen: boolean = true;
    sidebarOpen$ = new BehaviorSubject<boolean>(this._sidebarOpen);
    sidebarOpenMobile$ = new BehaviorSubject<boolean>(false);
    footerOpen$ = new BehaviorSubject<boolean>(false);

    overlayOpen: boolean = false;
    viewportWidth: number;

    constructor() {}

    toggleSidebar() {
        if (this.isMobile()) {
            this._sidebarOpen = true;
            this.sidebarOpenMobile$.next(this._sidebarOpen);
        } else {
            this._sidebarOpen = !this._sidebarOpen;
        }
        this.sidebarOpen$.next(this._sidebarOpen);
    }
    toggleOverlay() {
        this.overlayOpen = !this.overlayOpen;
    }
    setFooterOpen(open: boolean) {
        this.footerOpen$.next(open);
    }
    closeMobileSidebar() {
        if (this.isMobile()) {
            this._sidebarOpen = false;
            this.sidebarOpen$.next(this._sidebarOpen);
            this.sidebarOpenMobile$.next(this._sidebarOpen);
        }
    }
    @HostListener('window:resize', ['__ts__event__'])
    onResize(event) {
        console.log('ui-state.service', 'onResize', event);
        this.viewportWidth = event.target.innerWidth;
    }

    isMobile(): boolean {
        return window.innerWidth < 961;
    }
}
