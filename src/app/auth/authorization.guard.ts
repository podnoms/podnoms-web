import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private authService: AuthService) {}
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        const currentUser = this.authService.currentUser;
        if (currentUser) {
            // check if route is restricted by role
            if (
                route.data.roles &&
                route.data.roles.filter(e => currentUser.roles.indexOf(e)) ===
                    -1
            ) {
                // role not authorised so redirect to home page
                this.router.navigate(['/']);
                return false;
            }

            // authorised so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], {
            queryParams: { returnUrl: state.url }
        });
        return false;
    }
}
