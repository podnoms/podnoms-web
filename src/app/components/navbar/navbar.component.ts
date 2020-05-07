import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { DebugService } from '../../debug/debug.service';
import { environment } from '../../../environments/environment';
import { PaymentsService } from '../../payments/payments.service';
import { Profile, Payment } from '../../core';
import { AlertService } from '../../core/alerts/alert.service';
import { UiStateService } from '../../core/ui-state.service';
import { NGXLogger } from 'ngx-logger';
import { skip, take, map } from 'rxjs/operators';
import { ProfileStoreService } from '../../profile/profile-store.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
    profile$: Observable<Profile>;
    invoices$: Observable<Payment[]>;
    pricingEnabled: boolean = false;
    profileHasAdmin: boolean = false;
    searchActive: boolean = false;
    constructor(
        paymentService: PaymentsService,
        private authService: AuthService,
        private debugService: DebugService,
        private alertService: AlertService,
        private profileStoreService: ProfileStoreService,
        protected logger: NGXLogger,
        protected uiStateService: UiStateService
    ) {
        this.profile$ = this.profileStoreService.entities$.pipe(
            (skip(1), take(1)),
            map((r) => r[0])
        );
        this.profile$.subscribe(
            (p) =>
                (this.profileHasAdmin = this.authService.checkHasRoles([
                    'client-admin',
                ]))
        );
        this.invoices$ = paymentService.getPayments();
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
        this.debugService.getDebugInfo().subscribe((r) => {
            this.logger.debug('navbar.component', 'about', r);
            this.alertService.info(
                'About',
                `Client Version: ${environment.version}<br />` +
                    `API Version: ${r['version']}<br />` +
                    `Host: ${r['osVersion']['versionString']}`,
                'assets/img/logo-icon.png',
                {
                    autoClose: false,
                }
            );
        });
    }
}
