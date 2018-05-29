import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PodcastsModule } from './podcasts/podcasts.module';
import { AuthModule } from './auth/auth.module';
import { Podcast } from './core';
import { AuthGuard } from './auth/auth-guard.guard';
import { ProfileModule } from './profile/profile.module';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: 'home', loadChildren: 'app/auth/auth.module#AuthModule' },
    { path: 'auth', loadChildren: 'app/auth/auth.module#AuthModule' },
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
