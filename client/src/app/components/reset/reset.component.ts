import { PodnomsAuthService } from './../../services/podnoms-auth.service';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { BasePageComponent } from '../base-page/base-page.component';
import { AppInsightsService } from '../../services/app-insights.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-reset',
    templateUrl: './reset.component.html',
    styleUrls: ['./reset.component.css']
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
        private _authService: PodnomsAuthService,
        private _router: Router,
        private _insightsService: AppInsightsService
    ) {
        super();

        route.queryParams.subscribe((params) => {
            this.token = params.token;
            this.username = params.email;
        });
    }

    ngOnInit() {}
    resetPassword() {
        if (this.token) {
            if (this.newPassword === this.newPasswordRepeat) {
                this._authService
                    .resetPassword(
                        this.username,
                        this.newPassword,
                        this.newPasswordRepeat,
                        this.token
                    )
                    .subscribe(
                        (result) => {
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
                        (err) => {
                            this.errorMessage = this.formatError(
                                'Unable to reset your password, has the link expired?'
                            );
                        }
                    );
            }
        } else {
            if (this.username) {
                this._authService.forgotPassword(this.username).subscribe(
                    (result) => {
                        if (result['email']) {
                            console.log('reset.component.ts', 'method', result);
                            this.errorMessage = '';
                            this.successMessage = `A password reset link has been sent to ${
                                this.username
                            }`;
                        } else {
                            this.errorMessage = this.formatError(
                                'Unable to reset your password'
                            );
                        }
                    },
                    (err) => {
                        this.errorMessage = this.formatError(
                            'Unable to reset your password'
                        );
                        this._insightsService.logEvent('client_error', {
                            message: err.message
                        });
                    }
                );
            } else {
                this.errorMessage = 'Please enter your email address';
            }
        }
    }
}
