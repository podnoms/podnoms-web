import { Component, OnInit, ViewChild } from '@angular/core';
import { BasePageComponent } from '../../shared/components/base-page/base-page.component';
import {
    FormGroup,
    FormsModule,
    FormControl,
    FormBuilder,
    Validators
} from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { PasswordValidation } from '../validators/check-password.validator';
import { environment } from '../../../environments/environment';
import { ConstantsService } from '../../shared/services/constants.service';
import { ReCaptcha2Component } from 'ngx-captcha';
import { AuthApiProxyService } from '../auth-api-proxy.service';
@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends BasePageComponent implements OnInit {
    environment = environment;
    // tslint:disable-next-line: max-line-length
    form: FormGroup;
    signupForm: FormGroup;

    barLabel: string = 'Password strength';
    sending = false;
    _isRequesting: boolean = false;
    errorMessage: string;
    @ViewChild('captchaElem', { static: false })
    captchaElem: ReCaptcha2Component;

    constructor(
        private authService: AuthService,
        private podnomsAuthService: AuthApiProxyService,
        private router: Router,
        private fb: FormBuilder,
        private constants: ConstantsService
    ) {
        super();
        this._buildForm();
    }
    //#region Form Control Getters
    private _buildForm() {
        this.signupForm = this.fb.group({
            email: [
                '',
                [
                    Validators.required,
                    Validators.pattern(this.constants.emailRegex)
                ]
            ],
            passwordGroup: this.fb.group(
                {
                    password: [
                        '',
                        Validators.compose([
                            Validators.required,
                            Validators.minLength(4)
                        ])
                    ],
                    confirmPassword: [
                        '',
                        Validators.compose([
                            Validators.required,
                            Validators.minLength(4)
                        ])
                    ]
                },
                { validator: PasswordValidation.matchPassword }
            ),
            recaptcha: ['', Validators.required]
        });
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
    ngOnInit() {}
    socialLogin(method: string) {
        this.authService
            .socialLogin(method)
            .subscribe(
                success => this.router.navigate(['']),
                error =>
                    console.log('login.component', 'Error logging in', error)
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
            r => {
                if (r && r.isValid === true) {
                    this.authService
                        .register(this.email.value, this.password.value)
                        .subscribe(
                            result => {
                                if (result) {
                                    this.router.navigate(['/auth/login'], {
                                        queryParams: {
                                            brandNew: true,
                                            email: this.email.value
                                        }
                                    });
                                } else {
                                    this.errorMessage =
                                        'Error signing up, please try again later';
                                }
                            },
                            errors => {
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
            error => {
                this.errorMessage =
                    'Captcha did not validate, please refresh page and try again.';
            }
        );
    }
    onPasswordErrors(errors) {
        this.errorMessage = errors;
    }
}
