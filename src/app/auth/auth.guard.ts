import { Injectable } from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private authService: AuthService) {}
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        if (this.authService.isLoggedIn()) {
            if (route.data.roles) {
                const currentUser = this.authService.currentUser;

                if (this.authService.checkHasRoles(route.data.roles)) {
                    return true;
                }
            } else {
                return true;
            }
        }
        this.router.navigateByUrl('/', {
            replaceUrl: true
        });
        return false;
    }
}
