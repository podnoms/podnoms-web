import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-callback',
    templateUrl: './callback.component.html',
    styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {
    constructor(private _authService: AuthService, private _router: Router) {}

    ngOnInit() {
        this._router.navigate(['/podcasts']);
    }
}
