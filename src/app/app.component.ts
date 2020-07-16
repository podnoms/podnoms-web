import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { Profile } from './core';
import { UiStateService } from './core/ui-state.service';
import { SignalRService } from './shared/services/signal-r.service';
import { UtilityService } from './shared/services/utility.service';
import { Router } from '@angular/router';
import { UpdateService } from './shared/services/update.service';
import { ProfileStoreService } from './profile/profile-store.service';
import { environment } from '../environments/environment';
import { SwPush } from '@angular/service-worker';
import { PushRegistrationService } from './shared/services/push-registration.service';
import { skip, take, tap, map } from 'rxjs/operators';
import { SiteUpdateMessage } from './core/model/site-update-message';
import { AlertService } from './core/alerts/alert.service';
import { BaseComponent } from './shared/components/base/base.component';
import { NGXLogger } from 'ngx-logger';
import { LoggingService } from './services/logging.service';
import { ServerShowcaseService } from './shared/services/server-showcase.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent extends BaseComponent {
    sidebarOpen: boolean = true;
    overlayOpen: boolean = false;
    profile: Profile;
    modalUpdatesAction$: BehaviorSubject<any> = new BehaviorSubject<any>('');
    viewportWidth: number;
    modalAction$: BehaviorSubject<string> = new BehaviorSubject<string>('');
    constructor(
        private utilityService: UtilityService,
        private alertService: AlertService,
        updateService: UpdateService,
        private router: Router,
        private swPush: SwPush,
        private pushRegistrationService: PushRegistrationService,
        private profileStoreService: ProfileStoreService,
        private authService: AuthService,
        private signalr: SignalRService,
        private serverShowcaseService: ServerShowcaseService,
        protected logger: NGXLogger,
        private loggingService: LoggingService,
        public uiStateService: UiStateService
    ) {
        super();
        this.logger.debug('app.component', 'constructor');
        updateService.checkForUpdates();
    }
    ngOnInit() {
        if (!this.authService.isLoggedIn()) {
            // this.router.navigate(['/auth/login']);
            return;
        }
        if (environment.production || false) {
            this.utilityService.checkForApiServer().subscribe(
                () => {
                    this.authService.profile$.subscribe((p) => {
                        this.profile = p;
                    });
                    this._bootstrapAuth().subscribe((r) =>
                        this._bootstrapUpdates(r)
                    );
                },
                (err) => {
                    this.logger.error(
                        'home.component',
                        'checkForApiServer',
                        err
                    );
                    this.router.navigateByUrl('/error');
                }
            );
        } else {
            this._bootstrapAuth().subscribe((r) => this._bootstrapUpdates(r));
        }
    }

    loggedIn(): boolean {
        return false;
    }

    _bootstrapAuth(): Observable<boolean> {
        const observer = new BehaviorSubject<boolean>(false);
        this.authService.bootstrap().subscribe(() => {});
        this.authService.authNavStatus$.subscribe((r) => {
            if (r) {
                this.serverShowcaseService.getShowcase().subscribe((s) => {
                    if (s) {
                        this.modalUpdatesAction$.next(s);
                    }
                });
                this.signalr
                    .init('userupdates')
                    .then((listener) => {
                        listener
                            .on<SiteUpdateMessage>(
                                'userupdates',
                                'site-notices'
                            )
                            .subscribe((result) => {
                                this.alertService.info(
                                    result.title,
                                    result.message,
                                    result.imageUrl
                                );
                            });
                        observer.next(true);
                    })
                    .catch((err) => {
                        this.logger.error(
                            'app.component',
                            'Unable to initialise site update hub',
                            err
                        );
                        observer.error(err);
                    });
            } else {
                observer.next(false);
            }
        });
        return observer;
    }
    _bootstrapUpdates(isReady: boolean) {
        if (!isReady) {
            return;
        }
        const profile$ = this.profileStoreService.entities$.pipe(
            (skip(1), take(1)),
            map((r) => r[0])
        );

        profile$.subscribe((p) => {
            this.modalUpdatesAction$.next('redirectslug');
            if (p && environment.production) {
                this.logger.debug(
                    'Resetting page layout and registering for push notifications'
                );
                this.logger.debug(
                    'app.component',
                    'requesting subscription',
                    p
                );
                this.swPush
                    .requestSubscription({
                        serverPublicKey: environment.vapidPublicKey,
                    })
                    .then((s) => {
                        this.logger.debug(
                            'app.component',
                            'requested subscription',
                            s
                        );
                        this.logger.debug(
                            'app.component',
                            'subscribing on server',
                            p
                        );
                        this.pushRegistrationService
                            .addSubscriber(s.toJSON())
                            .subscribe(
                                (r) => {
                                    this.logger.debug(
                                        'app.component',
                                        'push request succeeded',
                                        r
                                    );
                                    this.swPush.messages.subscribe(
                                        (message) => {
                                            this.logger.debug(
                                                'app.component',
                                                'Push message',
                                                message
                                            );
                                        }
                                    );
                                },
                                (err) =>
                                    this.logger.error(
                                        'app.module',
                                        'Error calling registration service',
                                        err
                                    )
                            );
                    })
                    .catch((err) => {
                        this._unsubscribe();
                        this.logger.error(
                            'app.module',
                            'Error requesting push subscription',
                            err,
                            err.code,
                            err.message,
                            err.name
                        );
                    });
            } else if (environment.production) {
                this.logger.debug(
                    'app.component',
                    'Unable to load profile from store'
                );
            }
        });
    }
    _unsubscribe() {
        this.swPush.subscription.pipe(take(1)).subscribe((pushSubscription) => {
            pushSubscription.unsubscribe();
        });
    }
}
