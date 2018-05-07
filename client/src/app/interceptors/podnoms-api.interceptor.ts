import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpHeaderResponse,
    HttpHeaders,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { PodnomsAuthService } from '../services/podnoms-auth.service';

@Injectable()
export class PodNomsApiInterceptor implements HttpInterceptor {

    constructor(private _authService: PodnomsAuthService) {

    }
    private commonHeaders(): HttpHeaders {
        const headers = new HttpHeaders({
            'cache-control': 'no-cache',
            'content-type': 'application/json'
        });
        return headers;
    }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const authToken = localStorage.getItem('auth_token');
        let headers = this.commonHeaders();
        if (authToken) {
            headers = headers.append('Authorization', `Bearer ${authToken}`);
        }
        const changedReq = req.clone({
            headers: headers
        });
        return next.handle(changedReq).do(
            (event: HttpEvent<any>) => {},
            (err: any) => {
                if (err instanceof HttpErrorResponse && err.status === 401) {
                    this._authService.logout();
                }
            }
        );
    }
}
