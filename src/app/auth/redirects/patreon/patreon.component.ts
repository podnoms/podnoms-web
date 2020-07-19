import { Component, OnInit } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Component({
    selector: 'app-patreon',
    templateUrl: './patreon.component.html',
    styleUrls: ['./patreon.component.scss'],
})
export class PatreonComponent implements OnInit {
    constructor(
        private httpClient: HttpClient,
        private route: ActivatedRoute,
        private router: Router,
        private logger: NGXLogger
    ) {}

    ngOnInit(): void {
        this.route.queryParams.subscribe((params) => {
            const code = params['code'];
            const state = params['state'];
            this.logger.debug('patreon.component', 'ngOnInit', code, state);

            if (code) {
                this.httpClient
                    .get(
                        `${environment.apiHost}/subscriptions/patreon?accessKey=${code}`,
                        {
                            responseType: 'text',
                        }
                    )
                    .subscribe(
                        (r) => {
                            this.logger.debug(
                                'patreon.component.ts',
                                'token-result',
                                r
                            );
                            this.router.navigate(['/profile'], {
                                queryParams: {
                                    connectResult: 'success',
                                    reason: r,
                                },
                            });
                        },
                        (err) => {
                            this.logger.error(
                                'patreon.component',
                                'Unable to get patreon access token',
                                err
                            );
                            this.router.navigate(['/profile'], {
                                queryParams: {
                                    connectResult: 'fail',
                                    reason: err.error,
                                },
                            });
                        }
                    );
            }
            // this.router.navigate(['profile']);
        });
    }
}
