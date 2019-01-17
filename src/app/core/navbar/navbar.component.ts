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
    @Input() profile: Profile;

    constructor(
        private authService: AuthService,
        private debugService: DebugService,
        private alertService: AlertService,
        private uiStateService: UiStateService
    ) {}
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
                    `Host: ${r['osVersion']['versionString']}`
            );
        });
    }
}
