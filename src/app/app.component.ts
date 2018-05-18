import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Observable } from 'rxjs';
import { Profile } from './core';
import { UiStateService } from './core/ui-state.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    sidebarOpen: boolean = true;
    overlayOpen: boolean = false;
    profile$: Observable<Profile>;
    constructor(
        private authService: AuthService,
        public uiStateService: UiStateService
    ) {
        authService.bootstrap().subscribe(r => {
            if (r) {
                this.profile$ = authService.profile$;
            }
        });
    }

    loggedIn(): boolean {
        return false;
    }
}
