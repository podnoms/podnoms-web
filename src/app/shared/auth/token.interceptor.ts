import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {}
    private commonHeaders(): HttpHeaders {
        const headers = new HttpHeaders({
            'cache-control': 'no-cache',
            'content-type': 'application/json'
        });
        return headers;
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!this.authService) {
            return next.handle(req);
        }
        const authToken = this.authService.getAuthToken();
        let headers = req.url.indexOf('imageupload') > -1 ? new HttpHeaders() : this.commonHeaders();
        if (authToken) {
            headers = headers.append('Authorization', `Bearer ${authToken}`);
        }
        const changedReq = req.clone({
            headers: headers
        });
        return next.handle(changedReq);
    }
}
