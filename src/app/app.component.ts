import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Observable } from 'rxjs';
import { Profile, ToastService } from './core';
import { UiStateService } from './core/ui-state.service';
import { distinctUntilChanged } from 'rxjs/operators';
import { SignalRService } from './shared/services/signal-r.service';

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
        public uiStateService: UiStateService,
        private toast: ToastService,
        signalr: SignalRService
    ) {
        this.profile$ = authService.profile$;
        authService.bootstrap().subscribe(r => {});
        authService.authNavStatus$.subscribe(r => {
            if (r) {
                signalr
                    .init('userupdates')
                    .then(listener => {
                        listener.on<string>('userupdates', 'site-notices').subscribe(result => {
                            this.toast.showToast('New message', result);
                        });
                    })
                    .catch(err => {
                        console.error(
                            'app.component',
                            'Unable to initialise site update hub',
                            err
                        );
                    });
            }
        });
    }
    background() {}
    loggedIn(): boolean {
        return false;
    }
}
