import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PodcastComponent } from './podcast/podcast.component';
import { AuthGuard } from '../auth/auth.guard';
import { PodcastEditFormComponent } from './podcast-edit-form/podcast-edit-form.component';
import { EntryEditFormComponent } from './entry-edit-form/entry-edit-form.component';
import { AppLayoutComponentComponent } from 'app/components/app-layout-component/app-layout-component.component';

const routes: Routes = [
    {
        path: '',
        component: AppLayoutComponentComponent,
        children: [
            { path: '', component: PodcastComponent, pathMatch: 'full' },
            {
                path: 'entry/:entry/edit',
                component: EntryEditFormComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'add',
                component: PodcastEditFormComponent,
                canActivate: [AuthGuard],
            },

            {
                path: ':podcast',
                component: PodcastComponent,
                canActivate: [AuthGuard],
            },
            {
                path: ':podcast/edit',
                component: PodcastEditFormComponent,
                canActivate: [AuthGuard],
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PodcastsRoutingModule {}
