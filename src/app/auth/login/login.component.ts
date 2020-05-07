import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { BasePageComponent } from 'app/shared/components/base-page/base-page.component';
import { UiStateService } from 'app/core/ui-state.service';
import { NgxFancyLoggerService } from 'ngx-fancy-logger';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BasePageComponent implements OnInit {
    private metadata: Subscription;
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
        protected logger: NgxFancyLoggerService,
        protected uiStateService: UiStateService
    ) {
        super(logger, uiStateService);
    }

    ngOnInit() {
        this.returnUrl = this.route.snapshot.params['returnUrl'] || '';
        this.metadata = this.route.queryParams.subscribe((param: any) => {
            this.brandNew = param['brandNew'];
            this.justReset = param['justReset'];
            this.username = param['email'];
            this.returnUrl = param['returnUrl'];
        });
        this.uiStateService.setNakedPage(true);
    }
    socialLogin(method: string) {
        this.authService.socialLogin(method).subscribe(
            success => this._routePostLogin(),
            error =>
                this.logger.debug('login.component', 'Error logging in', error)
        );
    }
    login() {
        this.authService.login(this.username, this.password).subscribe(
            success => {
                this._routePostLogin();
            },
            error => {
                this.errorMessage =
                    'Unable to log you in - have you registered?';
            }
        );
    }
    _routePostLogin() {
        if (this.returnUrl) {
            this.router.navigateByUrl(this.returnUrl);
        } else {
            this.router.navigate(['']);
        }
    }
}
