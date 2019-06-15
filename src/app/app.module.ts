import { NgModule, ErrorHandler, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { WebStorageModule } from 'ngx-store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule, Profile } from './core';
import { AppStoreModule } from './store/app-store.module';
import { ComponentsModule } from './components/components.module';
import { SharedModule } from './shared/shared.module';
import { environment } from '../environments/environment';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ProfileStoreService } from './profile/profile-store.service';
import { Observable } from 'rxjs';
import { MonitoringService } from './shared/monitoring/monitoring.service';
import { MonitoringErrorHandler } from './shared/monitoring/monitoring-error.handler';
import { UpdateService } from './shared/services/update.service';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { registerLocaleData } from '@angular/common';
import localeIE from '@angular/common/locales/en-IE';
import { HomeComponent } from './home/home.component';
import { InterstitialComponent } from './shared/components/interstitial/interstitial.component';
import { AppDispatchers } from './store/app-config/dispatchers';

registerLocaleData(localeIE, 'ie');
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
        WebStorageModule,
        AngularFireModule.initializeApp({
            apiKey: environment.firebase.apiKey,
            authDomain: environment.firebase.authDomain,
            databaseURL: environment.firebase.databaseURL,
            storageBucket: environment.firebase.storageBucket,
            messagingSenderId: environment.firebase.messagingSenderId
        }),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        AngularFireMessagingModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production
        })
    ],
    providers: [
        MonitoringService,
        UpdateService,
        AppDispatchers,
        {
            provide: ErrorHandler,
            useClass: MonitoringErrorHandler
        },
        { provide: LOCALE_ID, useValue: 'en-IE' }
    ],
    declarations: [AppComponent, InterstitialComponent, HomeComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
    profile$: Observable<Profile[]>;
    constructor(profileStoreService: ProfileStoreService) {
        this.profile$ = profileStoreService.entities$;
    }
}
