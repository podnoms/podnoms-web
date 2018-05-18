import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PodcastService } from '../podcasts/podcast.service';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { SideOverlayComponent } from './side-overlay/side-overlay.component';
import { FooterComponent } from './footer/footer.component';
import { FooterPlayerComponent } from './footer/footer-player/footer-player.component';

@NgModule({
    imports: [CommonModule, RouterModule, SharedModule],
    providers: [PodcastService],
    declarations: [
        SidebarComponent,
        SideOverlayComponent,
        FooterComponent,
        FooterPlayerComponent
    ],
    exports: [
        SidebarComponent,
        SideOverlayComponent,
        FooterComponent,
        FooterPlayerComponent
    ]
})
export class ComponentsModule {}
