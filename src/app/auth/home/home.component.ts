import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    constructor(router: Router, auth: AuthService) {
        if (auth.isLoggedIn()) {
            router.navigate(['/podcasts']);
        }
    }

    ngOnInit() {}
}
