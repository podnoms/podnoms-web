import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/catch';

@Component({
    selector: 'app-reset',
    templateUrl: './reset.component.html',
    styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {
    username: string;
    errorMessage: string;
    constructor(private _authService: AuthService) {}

    ngOnInit() {}
    resetPassword() {
        if (this.username) {
            this._authService
                .resetPassword(this.username);
                // .subscribe(
                //     data => console.log(data),
                //     error => console.error(error),
                //     () => console.log('yay'));
        } else {
            this.errorMessage = 'Please enter your email address';
        }
    }
}
