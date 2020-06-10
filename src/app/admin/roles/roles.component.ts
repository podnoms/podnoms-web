import { Component, OnInit } from '@angular/core';
import { AuthApiProxyService } from '../../auth/auth-api-proxy.service';
import { AlertService } from '../../core/alerts/alert.service';

@Component({
    selector: 'app-roles',
    templateUrl: './roles.component.html',
    styleUrls: ['./roles.component.scss'],
})
export class RolesComponent implements OnInit {
    user: string = '';
    role: string = '';
    constructor(
        private podnomsAuthService: AuthApiProxyService,
        private alertService: AlertService
    ) {}

    ngOnInit(): void {}

    addToRole() {
        if (this.user && this.role) {
            this.podnomsAuthService
                .addUserToRole(this.user, this.role)
                .subscribe((r) =>
                    this.alertService.success(
                        'Success',
                        'User assigned to role'
                    )
                );
        }
    }
}
