import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PodcastStoreService } from '../podcasts/podcast-store.service';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { SideOverlayComponent } from './side-overlay/side-overlay.component';
import { FooterComponent } from './footer/footer.component';
import { FooterPlayerComponent } from './footer/footer-player/footer-player.component';
import { PasswordCheckerComponent } from './password-checker/password-checker.component';

@NgModule({
    imports: [CommonModule, RouterModule, SharedModule],
    providers: [PodcastStoreService],
    declarations: [
        SidebarComponent,
        SideOverlayComponent,
        FooterComponent,
        FooterPlayerComponent,
        PasswordCheckerComponent,
    ],
    exports: [
        SidebarComponent,
        SideOverlayComponent,
        FooterComponent,
        FooterPlayerComponent,
        PasswordCheckerComponent
    ]
})
export class ComponentsModule {}
