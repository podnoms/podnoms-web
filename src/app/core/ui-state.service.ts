import { Injectable, HostListener } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NGXLogger } from 'ngx-logger';

@Injectable({
    providedIn: 'root'
})
export class UiStateService {
    private _sidebarOpen: boolean = true;
    sidebarOpen$ = new BehaviorSubject<boolean>(this._sidebarOpen);
    sidebarOpenMobile$ = new BehaviorSubject<boolean>(false);
    footerOpen$ = new BehaviorSubject<boolean>(false);
    nakedPage$ = new BehaviorSubject<boolean>(false);

    overlayOpen: boolean = false;
    viewportWidth: number;

    constructor(private logger: NGXLogger) {}

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
    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
        this.logger.info('ui-state.service', 'onResize', event);
        this.viewportWidth = event.target.innerWidth;
    }

    isMobile(): boolean {
        return window.innerWidth < 961;
    }

    setNakedPage(isNaked: boolean): void {
        setTimeout(() => this.nakedPage$.next(isNaked));
    }
}
