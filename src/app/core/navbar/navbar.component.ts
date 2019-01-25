import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from '../model';
import { AuthService } from '../../auth/auth.service';
import { UiStateService } from '../ui-state.service';
import { DebugService } from '../../debug/debug.service';
import { AlertService } from '../alert.service';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
    profile$: Observable<Profile>;
    pricingEnabled: boolean = false;

    constructor(
        private authService: AuthService,
        private debugService: DebugService,
        private alertService: AlertService,
        private uiStateService: UiStateService
    ) {
        this.profile$ = authService.profile$;
    }
    toggleSidebar() {
        this.uiStateService.toggleSidebar();
    }
    toggleOverlay() {
        this.uiStateService.toggleOverlay();
    }
    logout() {
        this.authService.logout();
    }
    about() {
        this.debugService.getDebugInfo().subscribe(r => {
            console.log('navbar.component', 'about', r);
            this.alertService.info(
                'About',
                `Client Version: ${environment.version}<br />` +
                    `API Version: ${r['version']}<br />` +
                    `Host: ${r['osVersion']['versionString']}`,
                'assets/img/logo-icon.png',
                {
                    autoClose: false
                }
            );
        });
    }
}
