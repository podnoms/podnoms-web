import { Observable } from 'rxjs/Observable';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    username: string;
    password: string;
    passwordRepeat: string;

    errorMessage: string;
    constructor(private _authService: AuthService) {}

    ngOnInit() {}

    doRegister() {
        this._authService
            .signup(this.username, this.password)
            .catch(err => {
                if ((err.code = 'user_exists')) this.errorMessage = 'A user with this email address already exists';
                else this.errorMessage = err.description;

                return Observable.of(`Error logging in: ${err.description}`);
            })
            .subscribe(r => console.log('Done'));
    }
}
