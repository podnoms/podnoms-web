import { PodnomsAuthService } from './../../services/podnoms-auth.service';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { BasePageComponent } from '../base-page/base-page.component';
import { AppInsightsService } from '../../services/app-insights.service';

@Component({
    selector: 'app-reset',
    templateUrl: './reset.component.html',
    styleUrls: ['./reset.component.css']
})
export class ResetComponent extends BasePageComponent implements OnInit {
    username: string;
    errorMessage: string;
    successMessage: string;
    noToken: boolean = true;
    newPassword: string;
    newPasswordRepeat: string;
    constructor(
        private _authService: PodnomsAuthService,
        private _insightsService: AppInsightsService
    ) {
        super();
    }

    ngOnInit() {}
    resetPassword() {
        if (this.username) {
            this._authService.resetPassword(this.username).subscribe(
                (result) => {
                    if (result.status === 200) {
                        console.log('reset.component.ts', 'method', result);
                        this.errorMessage = '';
                        this.successMessage = `A password reset link has been sent to ${
                            this.username
                        }`;
                    } else {
                        this.errorMessage =
                            'Unable to reset your password\nPlease visit https://talk.podnoms.com and request help.';
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
