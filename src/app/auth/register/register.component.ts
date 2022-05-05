import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UiStateService } from 'app/core/ui-state.service';
import { ReCaptcha2Component } from 'ngx-captcha';
import { NGXLogger } from 'ngx-logger';
import { environment } from '../../../environments/environment';
import { ConstantsService } from '../../shared/services/constants.service';
import { AuthApiProxyService } from '../auth-api-proxy.service';
import { AuthService } from '../auth.service';
import { PasswordValidation } from '../../shared/validators/check-password.validator';
import { ProfileDataService } from './../../profile/profile-data.service';
import { UUID } from 'angular2-uuid';
import { CheckSlugUniqueValidator } from 'app/shared/validators/check-slug-unique.validator';
import { CheckEmailUniqueValidator } from 'app/shared/validators/check-email-unique.validator';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  environment = environment;
  // eslint-disable-next-line max-len
  registerForm: FormGroup;
  submitted = false;

  barLabel: string = 'Password strength';
  sending: boolean = false;
  isRequesting: boolean = false;
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
    private cdr: ChangeDetectorRef
  ) {
    this._buildForm();
  }
  //#region Form Control Getters

  private _buildForm() {
    this.registerForm = this.fb.group(
      {
        title: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: PasswordValidation.matchPassword,
      }
    );
  }
  getFormErrors(form: AbstractControl) {
    if (form instanceof FormControl) {
      // Return FormControl errors or null
      return form.errors ?? null;
    }
    if (form instanceof FormGroup) {
      const groupErrors = form.errors;
      // Form group can contain errors itself, in that case add'em
      const formErrors = groupErrors ? { groupErrors } : {};
      Object.keys(form.controls).forEach((key) => {
        // Recursive call of the FormGroup fields
        const error = this.getFormErrors(form.get(key));
        if (error !== null) {
          // Only add error if not null
          formErrors[key] = error;
        }
      });
      // Return FormGroup errors or null
      return Object.keys(formErrors).length > 0 ? formErrors : null;
    }
  }
  get f() {
    return this.registerForm.controls;
  }
  get username() {
    return this.registerForm.get('username');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get passwordGroup() {
    return this.registerForm.get('passwordGroup');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }
  get recaptcha() {
    return this.registerForm.get('recaptcha');
  }
  //#endregion

  socialLogin(method: string) {
    this.authService.socialLogin(method).subscribe(
      () => this.router.navigate(['']),
      (error) => this.logger.debug('login.component', 'Error logging in', error)
    );
  }

  onSubmit() {
    console.log('register.component', 'doRegister', this.registerForm);
    console.log(
      'register.component',
      'errors',
      this.getFormErrors(this.registerForm)
    );
    this.submitted = true;
    if (this.registerForm.invalid) {
      setTimeout(() => {
        this.cdr.detectChanges();
      });
      return;
    }
    this.isRequesting = true;
    // first check recaptcha server side
    const currentResponse = this.captchaElem.getCurrentResponse();
    if (!currentResponse) {
      alert("Don't do this");
    }
    this.podnomsAuthService.validateCaptchaToken(currentResponse).subscribe(
      (r) => {
        if (r && r.isValid === true) {
          console.log(
            'register.component',
            'register',
            this.username.value,
            this.email.value,
            this.password.value
          );
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
                this.isRequesting = false;
                this.registerForm.setErrors({ email: 'Email already in use' });
                this.email.setErrors({
                  taken: 'Email already in use',
                });
              }
            ),
            () => {
              this.isRequesting = false;
              this.email.setErrors({
                taken: 'Email already in use',
              });
              this.errorMessage =
                'Error signing up, have you already signed up with this email?';
            };
        } else {
          this.recaptcha.setErrors({
            other:
              'Captcha did not validate, please refresh page and try again',
          });
          this.errorMessage =
            'Captcha did not validate, please refresh page and try again.';
        }
      },
      () => {
        this.recaptcha.setErrors({
          other: 'Captcha did not validate, please refresh page and try again',
        });
        this.errorMessage =
          'Captcha did not validate, please refresh page and try again.';
      }
    );
  }
  onPasswordErrors(errors) {
    this.errorMessage = errors;
  }
}
