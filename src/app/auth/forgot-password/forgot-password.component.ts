import { ConstantsService } from './../../shared/services/constants.service';
import {
    Component,
    OnInit,
    ViewChild,
    ElementRef,
    AfterViewInit,
} from '@angular/core';
import { BasePageComponent } from '../../shared/components/base-page/base-page.component';
import {
    FormGroup,
    FormsModule,
    FormControl,
    FormBuilder,
    Validators,
} from '@angular/forms';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PasswordValidation } from '../validators/check-password.validator';
import { environment } from '../../../environments/environment';
import { UiStateService } from 'app/core/ui-state.service';
import { NGXLogger } from 'ngx-logger';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent extends BasePageComponent
    implements OnInit, AfterViewInit {
    environment = environment;
    returnTrip: boolean = false;
    errorMessage: string;
    successMessage: string;
    token: string;
    username: string;
    requestForm: FormGroup = this.fb.group({
        email: [
            '',
            [
                Validators.required,
                Validators.pattern(this.constants.emailRegex),
            ],
        ],
        recaptcha: ['', Validators.required],
    });
    resetForm: FormGroup = this.fb.group({
        password: [
            '',
            Validators.compose([Validators.required, Validators.minLength(4)]),
        ],
        confirmPassword: [
            '',
            Validators.compose([Validators.required, Validators.minLength(4)]),
        ],
    });
    @ViewChild('emailControl') emailField: ElementRef;
    @ViewChild('passwordControl') passwordField: ElementRef;

    constructor(
        route: ActivatedRoute,
        private authService: AuthService,
        private router: Router,
        private fb: FormBuilder,
        private constants: ConstantsService,
        logger: NGXLogger,
        uiStateService: UiStateService
    ) {
        super(logger, uiStateService);
        this.logger.debug('forgot-password.component', '');
        if (route.snapshot.queryParams['token']) {
            this.returnTrip = true;
        }
        route.queryParams.subscribe((params) => {
            this.token = params.token;
            this.username = params.email;
        });
    }

    ngOnInit() {}
    ngAfterViewInit() {
        setTimeout(() =>
            this.returnTrip
                ? this.passwordField.nativeElement.focus()
                : this.emailField.nativeElement.focus()
        );
    }

    resetPassword() {
        if (this.token) {
            // TODO Quick & dirty validation, should really try to re-use
            // the register form here
            if (this.password === this.confirmPassword) {
                this.authService
                    .resetPassword(
                        this.username,
                        this.password,
                        this.confirmPassword,
                        this.token
                    )
                    .subscribe(
                        (result) => {
                            if (result) {
                                this.router.navigate(['/auth/login'], {
                                    queryParams: {
                                        justReset: true,
                                        email: this.username,
                                    },
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
            } else {
                this.errorMessage = 'Passwords do not match';
            }
        } else {
            if (this.email) {
                this.authService.forgotPassword(this.email).subscribe(
                    (result) => {
                        if (result['email']) {
                            this.logger.debug(
                                'reset.component.ts',
                                'method',
                                result
                            );
                            this.errorMessage = '';
                            this.successMessage = `If we found a user with the email ${result['email']} then a reset link should be in your inbox`;
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
                    }
                );
            } else {
                this.errorMessage = 'Please enter your email address';
            }
        }
    }
    get email() {
        return this.requestForm.get('email').value;
    }
    // TODO
    get password() {
        return this.resetForm.get('password').value;
    }
    get confirmPassword() {
        return this.resetForm.get('confirmPassword').value;
    }
}
