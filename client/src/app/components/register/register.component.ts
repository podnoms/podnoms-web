import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    username: string = 'fergal@bitchmints.com';
    password: string = 'secret';
    passwordRepeat: string = 'secret';

    errorMessage: string;
    constructor(private _authService: AuthService) {}

    ngOnInit() {}

    doRegister() {
        this._authService.signup(this.username, this.password);
    }
}
