import { PodnomsAuthService } from 'app/services/podnoms-auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BasePageComponent } from '../base-page/base-page.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent extends BasePageComponent implements OnInit {
    constructor(
        private _router: Router,
        private _authService: PodnomsAuthService
    ) {
        super();
    }

    ngOnInit() {
        if (this._authService.isAuthenticated()) {
            this._router.navigate(['podcasts']);
        }
    }
}
