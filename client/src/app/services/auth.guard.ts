import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import { PodnomsAuthService } from './podnoms-auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private _auth: PodnomsAuthService) {}
    canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
        return new Promise(resolve => {
            if (this._auth.isAuthenticated()) {
                resolve(true);
            }
            resolve(false);
        });
    }
}
