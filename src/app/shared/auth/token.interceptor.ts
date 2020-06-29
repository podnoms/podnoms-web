import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpHeaders,
    HttpErrorResponse,
} from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { environment } from 'environments/environment';
import { switchMap, filter, take, catchError } from 'rxjs/operators';
import { NGXLogger } from 'ngx-logger';
import { auth } from 'firebase';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<
        any
    >(null);

    constructor(private authService: AuthService, private logger: NGXLogger) {}
    private commonHeaders(): HttpHeaders {
        const headers = new HttpHeaders({
            'cache-control': 'no-cache',
            'content-type': 'application/json',
        });
        return headers;
    }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        // TODO: Bigtime revisit this
        // 1. We don't want to be passing JWT tokens to random sites
        // 2. We probably don't want to be calling random sites from our front end?
        // --- all requests should go through our API.
        const authToken = this.authService.getAuthToken();

        if (
            !this.authService ||
            request.url.indexOf('/hubs/') !== -1 ||
            !request.url.startsWith(environment.apiHost)
        ) {
            return next.handle(request);
        }

        // request = this.addCredentials(request);
        if (authToken) {
            request = this.addToken(request, authToken);
        }

        return next.handle(request).pipe(
            catchError((error) => {
                if (
                    error instanceof HttpErrorResponse &&
                    error.status === 401
                ) {
                    return this.handle401Error(request, next);
                } else {
                    return throwError(error);
                }
            })
        );
    }

    private addToken(request: HttpRequest<any>, token: string) {
        return request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`,
            },
        });
    }

    private addCredentials(request: HttpRequest<any>) {
        return request.clone({ withCredentials: true });
    }

    private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
        if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);

            return this.authService.refreshToken().pipe(
                switchMap((token: any) => {
                    this.isRefreshing = false;
                    this.refreshTokenSubject.next(token);
                    return next.handle(this.addCredentials(request));
                })
            );
        } else {
            return this.refreshTokenSubject.pipe(
                filter((token) => token != null),
                take(1),
                switchMap((jwt) => {
                    this.isRefreshing = false;
                    return next.handle(this.addCredentials(request));
                })
            );
        }
    }
}
