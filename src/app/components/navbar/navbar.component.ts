import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { DebugService } from '../../debug/debug.service';
import { environment } from '../../../environments/environment';
import { PaymentsService } from '../../payments/payments.service';
import { Profile, Payment } from '../../core';
import { AlertService } from '../../core/alert.service';
import { UiStateService } from '../../core/ui-state.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
    profile$: Observable<Profile>;
    invoices$: Observable<Payment[]>;
    pricingEnabled: boolean = false;

    constructor(
        paymentService: PaymentsService,
        private authService: AuthService,
        private debugService: DebugService,
        private alertService: AlertService,
        private uiStateService: UiStateService
    ) {
        this.profile$ = authService.profile$;
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
