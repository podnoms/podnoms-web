import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from '../model';
import { PodNomsAuthService } from '../../auth/auth.service';
import { UiStateService } from '../ui-state.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
    @Input() profile: Profile;

    constructor(
        private authService: PodNomsAuthService,
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
}
