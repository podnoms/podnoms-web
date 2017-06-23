import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpModule, Http, RequestOptions} from '@angular/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PodcastComponent} from './components/podcast/podcast.component';
import {HomeComponent} from './components/home/home.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {AuthService} from './services/auth.service';
import {ProfileService} from './services/profile.service';
import {PodcastsService} from './services/podcasts.service';
import {FormsModule} from '@angular/forms';
import {ToastyModule} from 'ng2-toasty';
import {PusherService} from './services/pusher.service';
import {FilterEntryPipe} from './pipes/filter-entry.pipe';
import {EntryListItemComponent} from './components/entry-list-item/entry-list-item.component';
import {ProgressbarModule} from 'ngx-bootstrap/progressbar';
import {ModalModule} from 'ngx-bootstrap/modal';
import {AuthGuard} from './services/auth.guard';
import {AUTH_PROVIDERS, AuthConfig, AuthHttp} from 'angular2-jwt';
import {PodcastAddFormComponent} from './components/podcast-add-form/podcast-add-form.component';
import {ImageService} from './services/image.service';
import {PodcastUploadFormComponent} from './components/podcast-upload-form/podcast-upload-form.component';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
    return new AuthHttp(new AuthConfig({
        globalHeaders: [{'Content-Type': 'application/json'}]
    }), http, options);
}

@NgModule({
    declarations: [
        AppComponent,
        PodcastComponent,
        HomeComponent,
        NavbarComponent,

        FilterEntryPipe,
        EntryListItemComponent,
        PodcastAddFormComponent,
        PodcastUploadFormComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpModule,
        FormsModule,

        ModalModule.forRoot(),
        ProgressbarModule.forRoot(),
        ToastyModule.forRoot(),
    ],
    providers: [
        AuthService,
        AuthGuard,
        {
            provide: AuthHttp,
            useFactory: authHttpServiceFactory,
            deps: [Http, RequestOptions]
        },
        ProfileService,
        PodcastsService,
        ImageService,
        PusherService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}
