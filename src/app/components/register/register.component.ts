import { Observable } from 'rxjs/Observable';
import { PodnomsAuthService } from './../../services/podnoms-auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    username: string;
    password: string;
    passwordRepeat: string;
    sending = false;
    _isRequesting: boolean = false;
    errorMessage: string;
    constructor(
        private _authService: PodnomsAuthService,
        private _router: Router
    ) {}

    ngOnInit() {}

    doRegister() {
        this._isRequesting = true;
        this._authService
            .signup(this.username, this.password)
            .finally(() => (this._isRequesting = false))
            .subscribe(
                (result) => {
                    if (result) {
                        this._router.navigate(['/login'], {
                            queryParams: {
                                brandNew: true,
                                email: this.username
                            }
                        });
                    }
                },
                (errors) => {
                    debugger;
                    this.errorMessage = errors;
                }
            );
    }
}
