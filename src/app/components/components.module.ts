import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PodcastStoreService } from '../podcasts/podcast-store.service';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { SharedModule } from '../shared/shared.module';
import { SideOverlayComponent } from './side-overlay/side-overlay.component';
import { FooterComponent } from './footer/footer.component';
import { FooterPlayerComponent } from './footer/footer-player/footer-player.component';
import { PasswordCheckerComponent } from './password-checker/password-checker.component';
import { SidebarPodcastItemComponent } from './sidebar/sidebar-podcast-item/sidebar-podcast-item.component';
import {
  NgbTooltipModule,
  NgbProgressbarModule,
  NgbTypeaheadModule,
} from '@ng-bootstrap/ng-bootstrap';
import { NgxAudioplayerModule } from '@podnoms/ngx-audioplayer';

import { SharingComponent } from './sharing/sharing.component';
import { HeaderSearchComponent } from './header-search/header-search.component';
import { ScriptService } from '../core/scripts/script.service';
import { HeaderPlayerComponent } from './header-player/header-player.component';
import { ChatboxComponent } from './shared/chatbox/chatbox.component';
import { BoilerplateComponent } from './boilerplate/boilerplate.component';
import { ErrorComponent } from './error-pages/error/error.component';
import { NotFoundComponent } from './error-pages/not-found/not-found.component';
import { LoggerModule } from 'ngx-logger';
import { environment } from 'environments/environment';
import { RedirollComponent } from './shared/rediroll/rediroll.component';
import { OpmlComponent } from './opml/opml.component';
import { HighlightModule } from 'ngx-highlightjs';
import { OrderModule } from 'ngx-order-pipe';
import { AppLayoutComponentComponent } from './app-layout-component/app-layout-component.component';
import { MomentModule } from 'ngx-moment';
import { ImgFallbackDirective } from './img-fallback/img-fallback.component';
import { NgScrollbarModule } from 'ngx-scrollbar';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MomentModule,
    NgxAudioplayerModule,
    NgbTypeaheadModule,
    NgbTooltipModule,
    NgbProgressbarModule,
    LoggerModule.forRoot(environment.logConfig),
    NgScrollbarModule,
    HighlightModule,
    OrderModule,
  ],
  providers: [
    PodcastStoreService,
    // {
    //     provide: HIGHLIGHT_OPTIONS,
    //     useValue: {
    //         languages: getHighlightLanguages(),
    //     },
    // },
    ScriptService,
  ],
  declarations: [
    SidebarComponent,
    SideOverlayComponent,
    FooterComponent,
    FooterPlayerComponent,
    PasswordCheckerComponent,
    NavbarComponent,
    SharingComponent,
    SidebarPodcastItemComponent,
    HeaderSearchComponent,
    HeaderPlayerComponent,
    ChatboxComponent,
    BoilerplateComponent,
    ErrorComponent,
    NotFoundComponent,
    RedirollComponent,
    OpmlComponent,
    AppLayoutComponentComponent,
    ImgFallbackDirective,
  ],
  exports: [
    SidebarComponent,
    SideOverlayComponent,
    NavbarComponent,
    FooterComponent,
    FooterPlayerComponent,
    PasswordCheckerComponent,
    SharingComponent,
    ChatboxComponent,
    OpmlComponent,
    ImgFallbackDirective,
  ],
})
export class ComponentsModule {}
