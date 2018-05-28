import { Component, OnInit } from '@angular/core';
import { BasePageComponent } from '../../shared/components/base-page/base-page.component';
import { FormGroup, FormsModule, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PasswordValidation } from '../validators/check-password.validator';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent extends BasePageComponent implements OnInit {
    username: string;
    errorMessage: string;
    successMessage: string;
    token: string;
    newPassword: string;
    newPasswordRepeat: string;
    constructor(
        private authService: AuthService,
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder
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
            // TODO Quick & dirty validation, should really try to re-use
            // the register form here
            if (this.newPassword === this.newPasswordRepeat) {
                this.authService
                    .resetPassword(
                        this.username,
                        this.newPassword,
                        this.newPasswordRepeat,
                        this.token
                    )
                    .subscribe(
                        result => {
                            if (result) {
                                this.router.navigate(['/auth/login'], {
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
            } else {
                this.errorMessage = 'Passwords do not match';
            }
        } else {
            if (this.username) {
                this.authService.forgotPassword(this.username).subscribe(
                    result => {
                        if (result['email']) {
                            console.log('reset.component.ts', 'method', result);
                            this.errorMessage = '';
                            this.successMessage = `If we found a user with the email ${
                                result['email']
                            } then a reset link should be in your inbox`;
                        } else {
                            this.errorMessage = this.formatError('Unable to reset your password');
                        }
                    },
                    err => {
                        this.errorMessage = this.formatError('Unable to reset your password');
                        // this.insightsService.logEvent('client_error', {
                        //    message: err.message
                        //});
                    }
                );
            } else {
                this.errorMessage = 'Please enter your email address';
            }
        }
    }
}
