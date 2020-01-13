import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { environment } from 'environments/environment';
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

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        // TODO: Bigtime revisit this
        // 1. We don't want to be passing JWT tokens to random sites
        // 2. We probably don't want to be calling random sites from our front end?
        // --- all requests should go through our API.

        if (!this.authService || !req.url.startsWith(environment.apiHost)) {
            return next.handle(req);
        }
        const authToken = this.authService.getAuthToken();
        let headers =
            req.url.indexOf('imageupload') > -1
                ? new HttpHeaders()
                : this.commonHeaders();
        if (authToken) {
            headers = headers.append('Authorization', `Bearer ${authToken}`);
        }
        const changedReq = req.clone({
            headers: headers
        });
        return next.handle(changedReq);
    }
}
