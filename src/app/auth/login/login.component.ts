import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UiStateService } from 'app/core/ui-state.service';
import { NGXLogger } from 'ngx-logger';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  errorMessage: string = '';
  brandNew: boolean = false;
  justReset: boolean = false;
  isRequesting: boolean = false;
  returnUrl: any;
  submitted = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private logger: NGXLogger
  ) {}

  ngOnInit() {
    this.returnUrl = this.route.snapshot.params['returnUrl'] || '';
    this.brandNew = this.route.snapshot.params['brandNew'] || false;
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  get f() {
    return this.loginForm.controls;
  }

  socialLogin(method: string) {
    this.authService.socialLogin(method).subscribe(
      (r) => {
        if (r) {
          this._routePostLogin();
        } else {
          this.errorMessage = 'Unable to login just now';
        }
      },
      (error) => {
        this.logger.error('login.component', 'Error logging in', error);
        this.errorMessage = `Unable to login just now + ${error}`;
      }
    );
  }
  login() {
    this.submitted = true;
    console.log('login.component', 'login', this.loginForm);
    if (this.loginForm.invalid) {
      return;
    }
    this.authService
      .login(
        this.loginForm.get('username').value,
        this.loginForm.get('password').value
      )
      .subscribe(
        () => {
          this._routePostLogin();
        },
        () => {
          this.errorMessage = 'Unable to log you in - have you registered?';
        }
      );
  }
  _routePostLogin() {
    if (this.returnUrl) {
      this.router.navigateByUrl(this.returnUrl);
    } else {
      this.router.navigate(['podcasts']);
    }
  }
}
