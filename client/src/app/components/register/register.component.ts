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

    doRegister() {}
}
