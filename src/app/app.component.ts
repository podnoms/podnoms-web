import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Observable } from 'rxjs';
import { Profile, ToastService } from './core';
import { UiStateService } from './core/ui-state.service';
import { SignalRService } from './shared/services/signal-r.service';
import { UtilityService } from './shared/services/utility.service';
import { Router } from '@angular/router';

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
        public uiStateService: UiStateService,
        private toast: ToastService,
        router: Router,
        utilityService: UtilityService,
        authService: AuthService,
        signalr: SignalRService
    ) {
        utilityService.checkForApiServer().subscribe(
            response => {
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
                                console.error('app.component', 'Unable to initialise site update hub', err);
                            });
                    }
                });
            },
            err => {
                console.error('home.component', 'checkForApiServer', err);
                router.navigateByUrl('/error');
            }
        );
    }
    background() {}
    loggedIn(): boolean {
        return false;
    }
}
