import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router/';
import { AppComponent } from '../../app.component';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    constructor(private _rootComponent: AppComponent, private _authService: AuthService, private _router: Router) {
    }

    ngOnInit() {

    }

}
