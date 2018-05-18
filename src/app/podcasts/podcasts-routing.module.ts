import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PodcastsComponent } from './podcasts/podcasts.component';
import { AuthGuard } from '../auth/auth-guard.guard';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: PodcastsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: ':podcast',
        pathMatch: 'full',
        component: PodcastsComponent,
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PodcastsRoutingModule {}
