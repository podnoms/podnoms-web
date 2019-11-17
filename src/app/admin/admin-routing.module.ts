import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'app/auth/auth.guard';
import { ActivityComponent } from './activity/activity.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: ActivityComponent,
        canActivate: [AuthGuard],
        data: { roles: ['client-admin'] }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {}
