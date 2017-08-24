import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpModule, Http, RequestOptions} from '@angular/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './components/home/home.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {AuthService} from './services/auth.service';
import {ProfileService} from './services/profile.service';
import {PodcastService} from './services/podcast.service';
import {FormsModule} from '@angular/forms';
import {ToastyModule} from 'ng2-toasty';
import {PusherService} from './services/pusher.service';
import {FilterEntryPipe} from './pipes/filter-entry.pipe';
import {ProgressbarModule} from 'ngx-bootstrap/progressbar';
import {DropzoneModule} from 'ngx-dropzone-wrapper';

import {ModalModule} from 'ngx-bootstrap/modal';
import {AuthGuard} from './services/auth.guard';
import {AuthConfig, AuthHttp} from 'angular2-jwt';
import {ImageService} from './services/image.service';
import {DebugComponent} from './components/debug/debug.component';
import {InlineEditorModule} from '@qontu/ngx-inline-editor';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {StoreModule} from "@ngrx/store";
import {podcastsReducer} from './stores/podcasts.reducer';
import {selectedPodcastReducer} from './stores/selected-podcast.reducer';
import {PodcastComponent} from './components/podcast/podcast.component';
import {EntryListItemComponent} from "./components/podcast/entry-list-item/entry-list-item.component";

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
    return new AuthHttp(new AuthConfig({
        noClientCheck: true,
        globalHeaders: [{'Content-Type': 'application/json'}],
        tokenGetter: (() => localStorage.getItem('token')),
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
        // PodcastAddFormComponent,
        // PodcastUploadFormComponent,
        DebugComponent,
        SidebarComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpModule,
        FormsModule,
        InlineEditorModule,
        DropzoneModule.forRoot(),

        ModalModule.forRoot(),
        ProgressbarModule.forRoot(),
        ToastyModule.forRoot(),

        StoreModule.forRoot({podcasts: podcastsReducer, selectedPodcast: selectedPodcastReducer})
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
        PodcastService,
        ImageService,
        PusherService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}
