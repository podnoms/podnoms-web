import { Component } from '@angular/core';
import { PodNomsAuthService } from './auth/auth.service';
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
        private authService: PodNomsAuthService,
        public uiStateService: UiStateService
    ) {
        authService.bootstrap().subscribe(r => {
            this.profile$ = authService.profile$;
            // this.profile$.subscribe(profile => {
            //     console.log('app.component', 'profile$', profile);
            // });
        });
    }

    loggedIn(): boolean {
        return false;
    }
}
