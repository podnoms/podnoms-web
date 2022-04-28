import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UiStateService } from 'app/core/ui-state.service';
import { ReCaptcha2Component } from 'ngx-captcha';
import { NGXLogger } from 'ngx-logger';
import { environment } from '../../../environments/environment';
import { ConstantsService } from '../../shared/services/constants.service';
import { AuthApiProxyService } from '../auth-api-proxy.service';
import { AuthService } from '../auth.service';
import { PasswordValidation } from '../validators/check-password.validator';
import { checkSlugUniqueValidator } from '../validators/check-slug-unique.validator';
import { ProfileDataService } from './../../profile/profile-data.service';
@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
    environment = environment;
    // eslint-disable-next-line max-len
    form: FormGroup;
    signupForm: FormGroup;

    barLabel: string = 'Password strength';
    sending = false;
    _isRequesting: boolean = false;
    errorMessage: string;
    @ViewChild('captchaElem')
    captchaElem: ReCaptcha2Component;

    constructor(
        private authService: AuthService,
        private podnomsAuthService: AuthApiProxyService,
        private profileDataService: ProfileDataService,
        private router: Router,
        private fb: FormBuilder,
        private constants: ConstantsService,
        private logger: NGXLogger,
        private uiStateService: UiStateService
    ) {
        this._buildForm();
    }
    //#region Form Control Getters

    private _buildForm() {
        this.signupForm = this.fb.group(
            {
                username: [
                    null,
                    {
                        validators: [
                            Validators.required,
                            Validators.pattern(/^[a-zA-Z 0-9\_\-]*$/),
                        ],
                        asyncValidators: [
                            checkSlugUniqueValidator(this.profileDataService),
                        ],
                    },
                ],
                email: [
                    '',
                    [
                        // this.profileDataService.checkSlug(term)
                        Validators.required,
                        Validators.pattern(this.constants.emailRegex),
                    ],
                ],
                passwordGroup: this.fb.group(
                    {
                        password: [
                            '',
                            Validators.compose([
                                Validators.required,
                                Validators.minLength(4),
                            ]),
                        ],
                        confirmPassword: [
                            '',
                            Validators.compose([
                                Validators.required,
                                Validators.minLength(4),
                            ]),
                        ],
                    },
                    { validator: PasswordValidation.matchPassword }
                ),
                recaptcha: ['', Validators.required],
            },
            { updateOn: 'change' }
        );
    }
    get username() {
        return this.signupForm.get('username');
    }
    get email() {
        return this.signupForm.get('email');
    }
    get passwordGroup() {
        return this.signupForm.get('passwordGroup');
    }
    get password() {
        return this.passwordGroup.get('password');
    }
    get confirmPassword() {
        return this.passwordGroup.get('confirmPassword');
    }
    //#endregion

    socialLogin(method: string) {
        this.authService.socialLogin(method).subscribe(
            () => this.router.navigate(['']),
            (error) =>
                this.logger.debug('login.component', 'Error logging in', error)
        );
    }

    doRegister() {
        this._isRequesting = true;
        // first check recaptcha server side
        const currentResponse = this.captchaElem.getCurrentResponse();
        if (!currentResponse) {
            alert("Don't do this");
        }
        this.podnomsAuthService.validateCaptchaToken(currentResponse).subscribe(
            (r) => {
                if (r && r.isValid === true) {
                    this.authService
                        .register(
                            this.username.value,
                            this.email.value,
                            this.password.value
                        )
                        .subscribe(
                            (result) => {
                                if (result) {
                                    this.router.navigate(['/auth/login'], {
                                        queryParams: {
                                            brandNew: true,
                                            email: this.email.value,
                                        },
                                    });
                                } else {
                                    this.errorMessage =
                                        'Error signing up, please try again later';
                                }
                            },
                            () => {
                                // TODO - remote logging of this error
                                this.errorMessage =
                                    'Error signing up, have you already signed up with this email?';
                            }
                        );
                } else {
                    this.errorMessage =
                        'Captcha did not validate, please refresh page and try again.';
                }
            },
            () => {
                this.errorMessage =
                    'Captcha did not validate, please refresh page and try again.';
            }
        );
    }
    onPasswordErrors(errors) {
        this.errorMessage = errors;
    }
}
