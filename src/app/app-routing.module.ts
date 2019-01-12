import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth-guard.guard';
import { ErrorComponent } from './shared/components/error/error.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: 'error', pathMatch: 'full', component: ErrorComponent },
    { path: 'home', loadChildren: 'app/auth/auth.module#AuthModule' },
    { path: 'auth', loadChildren: 'app/auth/auth.module#AuthModule' },
    { path: 'debug', loadChildren: 'app/debug/debug.module#DebugModule' },
    {
        path: 'profile',
        loadChildren: 'app/profile/profile.module#ProfileModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'podcasts',
        loadChildren: 'app/podcasts/podcasts.module#PodcastsModule',
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
