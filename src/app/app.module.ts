import { GlobalsService } from './services/globals.service';
import { PodcastUploadFormComponent } from './components/podcast/podcast-upload-form/podcast-upload-form.component';
import { PodcastAddUrlFormComponent } from './components/podcast/podcast-add-url-form/podcast-add-url-form.component';
import { PodcastAddFormComponent } from './components/podcast/podcast-add-form/podcast-add-form.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, Http, RequestOptions } from '@angular/http';
import { FormsModule } from '@angular/forms';
import {
    NgcCookieConsentModule,
    NgcCookieConsentConfig
} from 'ngx-cookieconsent';
import { ToastyModule } from 'ng2-toasty';

import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { QuillModule } from 'ngx-quill';
import { EasyPieChartModule } from 'ng2modules-easypiechart';

import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import {
    GoogleLoginProvider,
    FacebookLoginProvider
} from 'angularx-social-login';

import { ModalModule } from 'ngx-bootstrap/modal';
import { AuthGuard } from './services/auth.guard';
import { ImageService } from './services/image.service';
import { DebugService } from './services/debug.service';
import { DebugComponent } from './components/debug/debug.component';
import { InlineEditorModule } from '@qontu/ngx-inline-editor';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ClipboardModule } from 'ngx-clipboard';
import { NgxSmartModalModule } from 'ngx-smart-modal';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PodnomsAuthService } from './services/podnoms-auth.service';
import { ProfileService } from './services/profile.service';
import { MomentModule } from 'angular2-moment';
import { FilterEntryPipe } from './pipes/filter-entry.pipe';
import { OrderByPipe } from './pipes/order-by.pipe';
import { PodcastComponent } from './components/podcast/podcast.component';
import { EntryListItemComponent } from './components/podcast/entry-list-item/entry-list-item.component';
import { DropzoneModule } from './components/shared/dropzone/dropzone.module';
import { reducers } from './reducers';
import { PodcastsEffects } from './effects/podcast.effects';
import { EntriesEffects } from './effects/entries.effects';
import { ChatEffects } from './effects/chat.effects';
import { ProfileEffects } from './effects/profile.effects';
import { PodcastService } from './services/podcast.service';
import { SignalRService } from 'app/services/signalr.service';
import { AppRoutingModule } from 'app/app.router';
import { PrettyPrintPipe } from 'app/pipes/pretty-print.pipe';
import { RegisterComponent } from './components/register/register.component';
import { ResetComponent } from './components/reset/reset.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AboutComponent } from './components/about/about.component';
import { FooterComponent } from './components/footer/footer.component';
import { JobsService } from 'app/services/jobs.service';
import { PushRegistrationService } from 'app/services/push-registration.service';
import { AppInsightsService } from 'app/services/app-insights.service';
import { MessagingService } from './services/messaging.service';

import { environment } from 'environments/environment';
import { FooterPlayerComponent } from 'app/components/footer-player/footer-player.component';
import { AudioService } from 'app/services/audio.service';
import { HumaniseTimePipe } from './pipes/humanise-time.pipe';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { PodNomsApiInterceptor } from './interceptors/podnoms-api.interceptor';
import { SideOverlayComponent } from './components/side-overlay/side-overlay.component';
import { UiStateService } from './services/ui-state.service';
import { BoilerplateComponent } from './components/boilerplate/boilerplate.component';
import { BasePageComponent } from './components/base-page/base-page.component';
import { ChatWidgetComponent } from './components/chat-widget/chat-widget.component';
import { ChatService } from 'app/services/chat.service';
import { BytesToHumanPipe } from './pipes/bytes-to-human.pipe';

const cookieConfig: NgcCookieConsentConfig = {
    cookie: {
        domain: environment.DOMAIN
    },
    palette: {
        popup: {
            background: '#64386b',
            text: '#ffcdfd'
        },
        button: {
            background: 'transparent',
            text: '#f8a8ff',
            border: '#f8a8ff'
        }
    },
    position: 'top',
    static: true,
    content: {
        message: 'We use cookies, suck it up!',
        href: 'https://podnoms.com/boilerplate/privacy'
    }
};

const config = new AuthServiceConfig([
    {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider(
            '357461672895-2mevm3b10b4bd3gjdvugl00up8ba2n4m.apps.googleusercontent.com'
        )
    },
    {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider('117715354940616')
    }
]);
export function provideConfig() {
    return config;
}

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        PodcastComponent,
        HomeComponent,
        NavbarComponent,

        FilterEntryPipe,
        BytesToHumanPipe,
        OrderByPipe,
        PrettyPrintPipe,
        EntryListItemComponent,
        PodcastAddFormComponent,
        PodcastUploadFormComponent,
        PodcastAddUrlFormComponent,
        DebugComponent,
        SidebarComponent,
        RegisterComponent,
        ResetComponent,
        ProfileComponent,
        AboutComponent,
        FooterComponent,
        FooterPlayerComponent,
        HumaniseTimePipe,
        SideOverlayComponent,
        BoilerplateComponent,
        BasePageComponent,
        ChatWidgetComponent,
        BytesToHumanPipe
    ],
    imports: [
        BrowserModule,
        AngularFireModule.initializeApp({
            apiKey: 'AIzaSyA5pGl4o1oGJi1Ke-842Lq0VvL2YZU2rfc',
            authDomain: 'podnoms-api.firebaseapp.com',
            databaseURL: 'https://podnoms-api.firebaseio.com',
            projectId: 'podnoms-api',
            storageBucket: 'podnoms-api.appspot.com',
            messagingSenderId: '357461672895'
        }),
        NgxSmartModalModule.forRoot(),

        AngularFireDatabaseModule,
        AngularFireAuthModule,
        AngularFirestoreModule,
        HttpClientModule,
        AppRoutingModule,
        HttpModule,
        FormsModule,
        InlineEditorModule,
        MomentModule,
        QuillModule,
        EasyPieChartModule,
        ModalModule.forRoot(),
        ProgressbarModule.forRoot(),
        ToastyModule.forRoot(),
        NgcCookieConsentModule.forRoot(cookieConfig),
        DropzoneModule,
        ClipboardModule,
        SocialLoginModule,

        StoreModule.forRoot(reducers),

        EffectsModule.forRoot([
            PodcastsEffects,
            EntriesEffects,
            ProfileEffects,
            ChatEffects
        ]),
        StoreDevtoolsModule.instrument({
            maxAge: 25 //  Retains last 25 states
        })
    ],
    providers: [
        PodnomsAuthService,
        UiStateService,
        AuthGuard,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: PodNomsApiInterceptor,
            multi: true
        },
        {
            provide: AuthServiceConfig,
            useFactory: provideConfig
        },

        SignalRService,
        ProfileService,
        PodcastService,
        ImageService,
        PushRegistrationService,
        DebugService,
        MessagingService,
        AppInsightsService,
        JobsService,
        AudioService,
        ChatService,
        GlobalsService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
