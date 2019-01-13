import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpHeaders,
    HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { request } from 'https';
import { switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
@Injectable()
export class ExpiredInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService, private router: Router) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req);

        // .pipe(
        //     tap(
        //         event => {},
        //         err => {
        //             if (
        //                 this.authService.getAuthToken() &&
        //                 req.url.startsWith(environment.apiHost) &&
        //                 err instanceof HttpErrorResponse &&
        //                 err.status === 401
        //             ) {
        //                 // handle 401 errors
        //                 this.authService.logout();
        //             }
        //         }
        //     )
        // );
    }
}
