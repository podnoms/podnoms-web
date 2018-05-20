import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    private metadata: Subscription;
    brandNew: boolean = false;
    justReset: boolean = false;
    username: string;
    password: string;
    isRequesting: boolean = false;

    constructor(
        private authService: AuthService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.metadata = this.activatedRoute.queryParams.subscribe((param: any) => {
            this.brandNew = param['brandNew'];
            this.justReset = param['justReset'];
            this.username = param['email'];
        });
    }
    socialLogin(method: string) {
        this.authService
            .socialLogin(method)
            .subscribe(
                success => this.router.navigate(['']),
                error => console.log('login.component', 'Error logging in', error)
            );
    }
    login() {
        this.authService
            .login(this.username, this.password)
            .subscribe(
                success => this.router.navigate(['']),
                error => console.log('login.component', 'Error logging in', error)
            );
    }
}
