import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule, Profile } from './core';
import { AppStoreModule } from './store/app-store.module';
import { ComponentsModule } from './components/components.module';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { SharedModule } from './shared/shared.module';
import { environment } from '../environments/environment';
import { ServiceWorkerModule, SwPush, SwUpdate } from '@angular/service-worker';
import { PushRegistrationService } from './shared/services/push-registration.service';
import { ProfileStoreService } from './profile/profile-store.service';
import { Observable } from 'rxjs';
import { ProfileDataService } from './profile/profile-data.service';
@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CoreModule,
        ComponentsModule,
        HttpClientModule,
        AppRoutingModule,
        AppStoreModule,
        SharedModule, // import here to make sure that AuthService is a singleton
        SimpleNotificationsModule.forRoot(),
        ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
    profile$: Observable<Profile[]>;
    constructor(
        profileStoreService: ProfileStoreService,
        push: SwPush,
        registrationService: PushRegistrationService
    ) {
        this.profile$ = profileStoreService.entities$;
        this.profile$.subscribe(p => {
            console.log('app.module', 'profile$', p);
            if (p && p.length !== 0 && environment.production) {
                push.messages.subscribe(m => {
                    console.log('app.module', 'Push message', m);
                });
                push
                    .requestSubscription({ serverPublicKey: environment.vapidPublicKey })
                    .then(s => {
                        console.log('app.module', 'requestSubscription', s.toJSON());
                        registrationService
                            .addSubscriber(s.toJSON())
                            .subscribe(r =>
                                console.log('app.module', 'addSubscriber', 'done', r)
                            );
                    });
            }
        });
    }
}
