import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { BasePageComponent } from '../../shared/components/base-page/base-page.component';
import { AuthApiProxyService } from '../auth-api-proxy.service';

@Component({
    selector: 'app-reset',
    templateUrl: './reset.component.html',
    styleUrls: ['./reset.component.scss']
})
export class ResetComponent extends BasePageComponent implements OnInit {
    username: string;
    errorMessage: string;
    successMessage: string;
    token: string;
    newPassword: string;
    newPasswordRepeat: string;
    constructor(
        route: ActivatedRoute,
        private authApiProxy: AuthApiProxyService,
        private _router: Router
    ) {
        super();

        route.queryParams.subscribe(params => {
            this.token = params.token;
            this.username = params.email;
        });
    }

    ngOnInit() {}
    resetPassword() {
        if (this.token) {
            if (this.newPassword === this.newPasswordRepeat) {
                this.authApiProxy
                    .resetPassword(
                        this.username,
                        this.newPassword,
                        this.newPasswordRepeat,
                        this.token
                    )
                    .subscribe(
                        result => {
                            if (result) {
                                this._router.navigate(['/login'], {
                                    queryParams: {
                                        justReset: true,
                                        email: this.username
                                    }
                                });
                            } else {
                                this.errorMessage = this.formatError(
                                    'Unable to reset your password, has the link expired?'
                                );
                            }
                        },
                        err => {
                            this.errorMessage = this.formatError(
                                'Unable to reset your password, has the link expired?'
                            );
                        }
                    );
            }
        } else {
            if (this.username) {
                this.authApiProxy.forgotPassword(this.username).subscribe(
                    result => {
                        if (result['email']) {
                            console.log('reset.component.ts', 'method', result);
                            this.errorMessage = '';
                            this.successMessage = `A password reset link has been sent to ${
                                this.username
                            }`;
                        } else {
                            this.errorMessage = this.formatError('Unable to reset your password');
                        }
                    },
                    err => {
                        this.errorMessage = this.formatError('Unable to reset your password');
                    }
                );
            } else {
                this.errorMessage = 'Please enter your email address';
            }
        }
    }
}
