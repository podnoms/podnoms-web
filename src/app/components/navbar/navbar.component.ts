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
import { skip, take, map, filter } from 'rxjs/operators';
import { ProfileStoreService } from '../../profile/profile-store.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    animations: [
        trigger('inOutAnimation', [
            transition(':enter', [
                style({ height: 0, opacity: 0 }),
                animate('1s ease-out', style({ height: 300, opacity: 1 })),
            ]),
            transition(':leave', [
                style({ height: 300, opacity: 1 }),
                animate('1s ease-in', style({ height: 0, opacity: 0 })),
            ]),
        ]),
    ],
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
            filter((r) => r !== null && r !== []),
            map((r) => r[0])
        );
        this.profile$.subscribe((p) => {
            this.profileHasAdmin = this.authService.checkHasRoles([
                'website-admin',
            ]);
        });
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
                {
                    autoClose: false,
                }
            );
        });
    }
}
