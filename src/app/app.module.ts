import { NgModule, ErrorHandler, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { UpdateService } from './shared/services/update.service';
import { registerLocaleData } from '@angular/common';
import localeIE from '@angular/common/locales/en-IE';
import { HomeComponent } from './home/home.component';
import { InterstitialComponent } from './shared/components/interstitial/interstitial.component';
import { AppDispatchers } from './store/app-config/dispatchers';
import { TokenInterceptor } from './shared/auth/token.interceptor';
import { LoggerModule, NgxLoggerLevel, NGXLogger } from 'ngx-logger';
import { AuthModule } from './auth/auth.module';
import authServiceConfig from './auth/auth-config';
import { ErrorHandlerService } from './services/error-handler.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SocialLoginModule } from '@abacritt/angularx-social-login';

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
    AuthModule,
    SharedModule, // import here to make sure that AuthService is a singleton
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
    LoggerModule.forRoot(environment.logConfig),
    SocialLoginModule,
    NgbModule,
  ],
  providers: [
    UpdateService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    { provide: LOCALE_ID, useValue: 'en-IE' },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: authServiceConfig,
    },
    { provide: ErrorHandler, useClass: ErrorHandlerService },
    AppDispatchers,
  ],
  declarations: [AppComponent, InterstitialComponent, HomeComponent],
  bootstrap: [AppComponent],
})
export class AppModule {
  profile$: Observable<Profile[]>;

  constructor(
    profileStoreService: ProfileStoreService,
    private logger: NGXLogger
  ) {
    this.profile$ = profileStoreService.entities$;
    if (environment.production || true) {
      console.log(
        `%c
<------------------------------>
<                              >
<    🧙 mooooooooooohoo 🦄     >
< like looking under the hood? >
<          Join us @           >
<   http://github.com/podnoms  >
<------------------------------>
        \\   ^__^
        \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||
                `,
        'font-family:monospace; color: fuchsia; font-size: x-large'
      );
    }
  }
}
