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
import { skip, take, tap } from 'rxjs/operators';
import { SiteUpdateMessage } from './core/model/site-update-message';
import { AlertService } from './core/alerts/alert.service';
import { BaseComponent } from './shared/components/base/base.component';
import { NgxFancyLoggerService } from 'ngx-fancy-logger';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent extends BaseComponent {
    sidebarOpen: boolean = true;
    overlayOpen: boolean = false;
    profile$: Observable<Profile>;
    action$: BehaviorSubject<string> = new BehaviorSubject<string>('');
    viewportWidth: number;
    modalAction$: BehaviorSubject<string> = new BehaviorSubject<string>('');
    constructor(
        utilityService: UtilityService,
        private alertService: AlertService,
        updateService: UpdateService,
        router: Router,
        private swPush: SwPush,
        private pushRegistrationService: PushRegistrationService,
        private profileStoreService: ProfileStoreService,
        private authService: AuthService,
        private signalr: SignalRService,
        protected logger: NgxFancyLoggerService,
        public uiStateService: UiStateService
    ) {
        super(logger, uiStateService);
        this.uiStateService.nakedPage$.pipe(
            tap(r => this.logger.debug('app.component', 'nakedPage', r))
        );
        updateService.checkForUpdates();
        if (environment.production || false) {
            utilityService.checkForApiServer().subscribe(
                () => {
                    this.profile$ = authService.profile$;
                    this._bootstrapAuth().subscribe(r =>
                        this._bootstrapUpdates(r)
                    );
                },
                err => {
                    console.error('home.component', 'checkForApiServer', err);
                    router.navigateByUrl('/error');
                }
            );
        } else {
            this.profile$ = authService.profile$;
            this._bootstrapAuth().subscribe(r => this._bootstrapUpdates(r));
        }
    }

    loggedIn(): boolean {
        return false;
    }

    _bootstrapAuth(): Observable<boolean> {
        const observer = new BehaviorSubject<boolean>(false);
        this.authService.bootstrap().subscribe(() => {});
        this.authService.authNavStatus$.subscribe(r => {
            if (r) {
                this.signalr
                    .init('userupdates')
                    .then(listener => {
                        listener
                            .on<SiteUpdateMessage>(
                                'userupdates',
                                'site-notices'
                            )
                            .subscribe(result => {
                                this.alertService.info(
                                    result.title,
                                    result.message,
                                    result.imageUrl
                                );
                            });
                        observer.next(true);
                    })
                    .catch(err => {
                        console.error(
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

        const profile$ = this.profileStoreService.entities$
            .pipe((skip(1), take(1)))
            .map(r => r[0]);

        profile$.subscribe(p => {
            this.action$.next('redirectslug');
            if (p && environment.production) {
                this.logger.debug(
                    'app.component',
                    'requesting subscription',
                    p
                );
                this.swPush
                    .requestSubscription({
                        serverPublicKey: environment.vapidPublicKey
                    })
                    .then(s => {
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
                                r => {
                                    this.logger.debug(
                                        'app.component',
                                        'push request succeeded',
                                        r
                                    );
                                    this.swPush.messages.subscribe(message => {
                                        this.logger.debug(
                                            'app.component',
                                            'Push message',
                                            message
                                        );
                                    });
                                },
                                err =>
                                    console.error(
                                        'app.module',
                                        'Error calling registration service',
                                        err
                                    )
                            );
                    })
                    .catch(err => {
                        this._unsubscribe();
                        console.error(
                            'app.module',
                            'Error requesting push subscription',
                            err,
                            err.code,
                            err.message,
                            err.name
                        );
                    });
            } else {
                this.logger.debug(
                    'app.component',
                    'Unable to load profile from store'
                );
            }
        });
    }
    _unsubscribe() {
        this.swPush.subscription.pipe(take(1)).subscribe(pushSubscription => {
            pushSubscription.unsubscribe();
        });
    }
}
