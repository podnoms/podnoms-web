import { Component, OnInit } from '@angular/core';
import { BasePageComponent } from '../../shared/components/base-page/base-page.component';
import { FormGroup, FormsModule, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { PasswordValidation } from '../validators/check-password.validator';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends BasePageComponent implements OnInit {
    form: FormGroup;
    signupForm: FormGroup;

    barLabel: string = 'Password strength';
    sending = false;
    _isRequesting: boolean = false;
    errorMessage: string;
    constructor(
        private authService: AuthService,
        private router: Router,
        private fb: FormBuilder
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
                    Validators.pattern(
                        // tslint:disable-next-line:max-line-length
                        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    )
                ]
            ],
            passwordGroup: this.fb.group(
                {
                    password: [
                        '',
                        Validators.compose([Validators.required, Validators.minLength(4)])
                    ],
                    confirmPassword: [
                        '',
                        Validators.compose([Validators.required, Validators.minLength(4)])
                    ]
                },
                { validator: PasswordValidation.matchPassword }
            )
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

    doRegister() {
        this._isRequesting = true;
        this.authService.register(this.email.value, this.password.value).subscribe(
            result => {
                if (result) {
                    this.router.navigate(['/auth/login'], {
                        queryParams: {
                            brandNew: true,
                            email: this.email.value
                        }
                    });
                } else {
                    this.errorMessage = 'Error signing up, please try again later';
                }
            },
            errors => {
                // TODO - remote logging of this error
                this.errorMessage =
                    'Error signing up, have you already signed up with this email?';
            }
        );
    }
    onPasswordErrors(errors) {
        this.errorMessage = errors;
    }
}
