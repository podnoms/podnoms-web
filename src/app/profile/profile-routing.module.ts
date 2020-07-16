import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './profile/profile.component';
import { OpmlPageComponent } from './opml-page/opml-page.component';
import { AppLayoutComponentComponent } from 'app/components/app-layout-component/app-layout-component.component';

const routes: Routes = [
    {
        path: '',
        component: AppLayoutComponentComponent,
        children: [
            { path: '', pathMatch: 'full', component: ProfileComponent },
            {
                path: 'opml',
                component: OpmlPageComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProfileRoutingModule {}
