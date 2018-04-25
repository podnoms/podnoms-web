import { PodnomsAuthService } from './../../services/podnoms-auth.service';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-reset',
    templateUrl: './reset.component.html',
    styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {
    username: string;
    errorMessage: string;
    successMessage: string;
    constructor(private _authService: PodnomsAuthService) {}

    ngOnInit() {}
    resetPassword() {
        if (this.username) {
            this._authService
                .resetPassword(this.username);
                // .catch(err => {
                //     this.errorMessage = err.description;
                //     return Observable.of(`Error resetting password: ${err.description}`);
                // })
                // .subscribe(result => {
                //     console.log('reset.component.ts', 'method', result);
                //     this.errorMessage = '';
                //     this.successMessage = `A password reset link has been sent to ${this.username}`;
                // });
        } else {
            this.errorMessage = 'Please enter your email address';
        }
    }
}
