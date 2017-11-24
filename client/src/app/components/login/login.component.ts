import { Component, NgZone, OnInit } from '@angular/core';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    user: any;
    username: string;
    password: string;

    signIn;
    widget;

    constructor() {
    }

    ngOnInit() {
    }
    login() {}
    logout() {}
}
