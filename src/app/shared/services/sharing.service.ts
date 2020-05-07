import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ScriptService } from '../../core/scripts/script.service';
import { NGXLogger } from 'ngx-logger';
import { map } from 'rxjs/operators';
declare var FB: any;
@Injectable({
    providedIn: 'root',
})
export class SharingService {
    constructor(
        private http: HttpClient,
        private scriptService: ScriptService,
        protected logger: NGXLogger
    ) {}
    getSharingLink(id: string): Observable<string> {
        return this.http
            .post<any>(`${environment.apiHost}/sharing/generatelink`, {
                id: id,
            })
            .pipe(map((r) => r.url));
    }
    getSharingItem(sharingLink: string): Observable<any> {
        return this.http.get<any>(
            `${environment.apiHost}/pub/sharing/details/${sharingLink}`
        );
    }
    shareToEmail(id: string, email: string, message: string): any {
        return this.http.post<any>(`${environment.apiHost}/sharing/`, {
            id: id,
            email: email,
            message: message,
        });
    }
    shareToTwitter(id: string): Observable<boolean> {
        const observer = new BehaviorSubject<boolean>(false);
        this.http
            .post<any>(`${environment.apiHost}/sharing/generatelink`, {
                id: id,
            })
            .pipe(map((r) => r.url))
            .subscribe((l) => {
                const twitterWindow = window.open(
                    `https://twitter.com/share?url=${l}`,
                    'twitter-popup',
                    'height=350,width=600'
                );
                if (twitterWindow.focus) {
                    twitterWindow.focus();
                }
            });
        return observer;
    }
    shareToFacebook(id: string): Observable<boolean> {
        const observer = new BehaviorSubject<boolean>(false);
        this.scriptService.loadScript('facebook').then((s) => {
            window.fbAsyncInit = function () {
                FB.init({
                    appId: environment.facebook.appId,
                    autoLogAppEvents: true,
                    xfbml: true,
                    version: environment.facebook.version,
                });
            };
            FB.getLoginStatus((response: any) => {
                this.http
                    .post<any>(`${environment.apiHost}/sharing/generatelink`, {
                        id: id,
                    })
                    .pipe(map((r) => r.url))
                    .subscribe(
                        (l) => {
                            FB.ui(
                                {
                                    method: 'share',
                                    href: l,
                                },
                                (r: any) => {
                                    this.logger.debug(
                                        'sharing.service',
                                        'fb response',
                                        r
                                    );
                                    if (r) {
                                        observer.next(true);
                                    } else {
                                        observer.error(
                                            'Unable to create sharing link'
                                        );
                                    }
                                }
                            );
                        },
                        (e) => observer.error(e)
                    );
            });
        });
        return observer;
    }
}
