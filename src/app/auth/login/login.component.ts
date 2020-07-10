import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UiStateService } from 'app/core/ui-state.service';
import { NGXLogger } from 'ngx-logger';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    errorMessage: string = '';
    brandNew: boolean = false;
    justReset: boolean = false;
    username: string;
    password: string;
    isRequesting: boolean = false;
    returnUrl: any;

    constructor(
        private authService: AuthService,
        private router: Router,
        private route: ActivatedRoute,
        protected logger: NGXLogger,
        protected uiStateService: UiStateService
    ) {}

    ngOnInit() {
        this.returnUrl = this.route.snapshot.params['returnUrl'] || '';
        this.uiStateService.setNakedPage(true);
    }
    socialLogin(method: string) {
        this.authService.socialLogin(method).subscribe(
            () => this._routePostLogin(),
            (error) =>
                this.logger.debug('login.component', 'Error logging in', error)
        );
    }
    login() {
        this.authService.login(this.username, this.password).subscribe(
            () => {
                this._routePostLogin();
            },
            () => {
                this.errorMessage =
                    'Unable to log you in - have you registered?';
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
