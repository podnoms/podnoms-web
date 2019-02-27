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
import { ChartsModule } from 'ng2-charts';
import { SidebarPodcastItemComponent } from './sidebar/sidebar-podcast-item/sidebar-podcast-item.component';
import { NgbTooltipModule, NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { MomentModule } from 'ngx-moment';
import { SharingComponent } from './sharing/sharing.component';
import { ScriptService } from '../core/scripts/script.service';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};
@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        SharedModule,
        ChartsModule,
        MomentModule,
        PerfectScrollbarModule,
        NgbTooltipModule,
        NgbProgressbarModule
    ],
    providers: [
        PodcastStoreService,
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        },
        ScriptService
    ],
    declarations: [
        SidebarComponent,
        SideOverlayComponent,
        FooterComponent,
        FooterPlayerComponent,
        PasswordCheckerComponent,
        NavbarComponent,
        SharingComponent,
        SidebarPodcastItemComponent
    ],
    exports: [
        SidebarComponent,
        SideOverlayComponent,
        NavbarComponent,
        FooterComponent,
        FooterPlayerComponent,
        PasswordCheckerComponent,
        SharingComponent
    ]
})
export class ComponentsModule {}
