import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PodcastComponent } from '../podcasts/podcast/podcast.component';
import { AuthGuard } from '../auth/auth.guard';
import { ProcessUrlComponent } from './components/process-url/process-url.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: ProcessUrlComponent,
    },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PublicRoutingModule {}
