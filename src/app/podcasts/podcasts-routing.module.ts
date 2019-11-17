import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PodcastComponent } from './podcast/podcast.component';
import { AuthGuard } from '../auth/auth.guard';
import { PodcastEditFormComponent } from './podcast-edit-form/podcast-edit-form.component';
import { EntryEditFormComponent } from './entry-edit-form/entry-edit-form.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: PodcastComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'entry/:entry/edit',
        component: EntryEditFormComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'add',
        component: PodcastEditFormComponent,
        canActivate: [AuthGuard]
    },
    {
        path: ':podcast',
        component: PodcastComponent,
        canActivate: [AuthGuard]
    },
    {
        path: ':podcast/edit',
        component: PodcastEditFormComponent,
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PodcastsRoutingModule {}
