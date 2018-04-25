import { Component, OnInit } from '@angular/core';
import { PodnomsAuthService } from 'app/services/podnoms-auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-callback',
    templateUrl: './callback.component.html',
    styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {
    constructor(private _authService: PodnomsAuthService, private _router: Router) {}

    ngOnInit() {
        this._router.navigate(['/podcasts']);
    }
}
