import { Component } from '@angular/core';
import { PodNomsAuthService } from './auth/auth.service';
import { Observable } from 'rxjs';
import { Profile } from './core';
import { UiStateService } from './core/ui-state.service';
import { distinctUntilChanged } from 'rxjs/operators';

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
        this.profile$ = authService.profile$;
        this.profile$.subscribe(profile => {
            console.log('app.component', 'profile$', profile);
        });
        authService.bootstrap().subscribe(r => {});
        console.log('app.component', 'constructor', authService.guid);
    }
    background() {
        console.log('app.component', 'background', this.profile$);
    }
    loggedIn(): boolean {
        return false;
    }
}
